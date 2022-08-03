//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/// Project Imports ///

import "./Pozition.sol";
import "./interfaces/IFuturesMarket.sol";
import "./interfaces/IAddressResolver.sol";

/**
 * @dev Contract allows users to deposit sUSD and use it as margin for future positions via `Futures*`.
 *
 * sUSD tokens can be minted by staking SNX or obtained by collateralising ETH to borrow sUSD. NOTE sUSD
 * as of writing this is the only margin token allowed by Synthetix.
 *
 * It also facilitates the creation of 1/1 FuturePosition NFTs to be transferred to `msg.sender`.
 *
 * Keep in mind this factory follows a minimal proxy contract pattern where newly 'cloned' NFTs
 * simply point to a common implementation contract.
 *
 * _See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol_
 */
contract PozitionManager is ReentrancyGuard {
    using Clones for address;
    using EnumerableSet for EnumerableSet.AddressSet;

    /// Storage Variables ///

    /**
     * @dev Synthetix's `AddressResolver` to grab Synths and Market contracts.
     */
    IAddressResolver private addressResolver;

    /**
     * @dev Track sUSD deposited by address.
     */
    mapping(address => uint256) public depositsByWalletAddress;

    /**
     * @dev Margin token used for Synthetix Future positions. At the moment only sUSD is allowed.
     */
    IERC20 private marginToken;

    /**
     * @dev The smart contract address where all FutureNFTPositions will point to.
     */
    address public implementation;

    /**
     * @dev An array of all mintedPosition addresses.
     */
    mapping(address => EnumerableSet.AddressSet) private allMintedPositions;

    /// Constructor ///

    constructor(IAddressResolver _addressResolver, address _implementation) {
        addressResolver = _addressResolver;
        implementation = _implementation;

        address sUSD = addressResolver.getAddress("ProxyERC20sUSD");
        require(sUSD != address(0), "Err: ProxyERC20sUSD not found.");
        marginToken = IERC20(sUSD);
    }

    /// Internal Functions ///

    /**
     * @dev Creates an exact copy of the `implementation` contract, following the minimal proxy pattern.
     *
     * IMPORTANT: `initialize` is not called here. It's expected the calling function will call `initialize` within
     * the same transaction as `clone`.
     */
    function _clone(
        address _trader,
        IFuturesMarket _market,
        uint256 _margin,
        int256 _size
    ) internal returns (Pozition position) {
        position = Pozition(implementation.clone());
        position.initialize(_market, _margin, _size, marginToken, this);

        emit Clone(_trader, _market, _margin, _size, position);
    }

    /// Mutative Functions ///

    /**
     * @dev Deposit sUSD into the manager to be used as margin when opening positions.
     */
    function deposit(uint256 _amount) public {
        require(_amount > 0, "Err: Deposit amount too small.");
        require(
            marginToken.allowance(msg.sender, address(this)) >= _amount,
            "Err: sUSD not approved"
        );

        depositsByWalletAddress[msg.sender] += _amount;
        bool isSuccess = marginToken.transferFrom(msg.sender, address(this), _amount);
        require(isSuccess, "Err: Bad transfer, deposit failed.");

        emit DepositMargin(msg.sender, _amount);
    }

    /**
     * @dev Withdraw previously deposited sUSD from the manager. A `_receiver` is specified to signal
     * the address which will be receiving the sUSD upon a successful withdraw.
     */
    function withdraw(uint256 _amount, address _receiver) public nonReentrant {
        require(_amount > 0, "Err: Withdraw amount too small.");
        require(_receiver != address(0), "Err: Receiver is addr(0).");
        require(depositsByWalletAddress[msg.sender] > 0, "Err: No margin.");
        require(
            depositsByWalletAddress[msg.sender] >= _amount,
            "Err: Withdrawing more than available."
        );

        depositsByWalletAddress[msg.sender] -= _amount;
        bool isSuccess = marginToken.transfer(_receiver, _amount);
        require(isSuccess, "Err: Bad transfer, withdraw failed.");

        emit WithdrawMargin(msg.sender, _receiver, _amount);
    }

    /**
     * @dev Performs a trade on `_market` using `_amount` margin previously provided in the `FuturesPositionsManager`.
     *
     * This withdraws margin from within the `FuturesPositionsManager` but will revert if `_amount > deposit`. The
     * address of the newly minted NFT position is returned upon successful trade.
     *
     * The `_sizeDelta` is a derived value from a combination of proportion leverage and the price of the underlying
     * asset for the specified market. Synthetix Futures does the hard work work validation these attributes before
     * allowing a position to be created. This function will revert if Synthetix Futures reverts.
     */
    function openPosition(
        uint256 _margin,
        int256 _size,
        bytes32 _market
    ) public returns (Pozition position) {
        require(_margin > 0, "Err: Margin must be non-zero.");
        require(depositsByWalletAddress[msg.sender] >= _margin, "Err: Not enough margin.");

        IFuturesMarket market = IFuturesMarket(addressResolver.getAddress(_market));

        // A non FuturesMarket contract but a registered contract on Synthetix can be called.
        //
        // TODO: What is an efficient way to check that only FuturesMarket contracts are specified?
        require(address(market) != address(0), "Err: Unsupported market.");

        position = Pozition(_clone(msg.sender, market, _margin, _size));

        withdraw(_margin, address(position));

        position.depositMargin(_margin);
        position.open(msg.sender);

        emit OpenPosition(msg.sender, _margin, _size, market, position);
    }

    /**
     * @dev Given the `_position`, close if possible and withdraw all margin into the manager.
     *
     * TODO: Liquidated positions with remaining margin should ideally be deposited back into the manager
     * to be withdrawn or used in another position in the future but that is not currently implemented.
     */
    function closePosition(Pozition _position) external {
        require(_position.isOpen(), "Err: Position not open.");
        require(_position.ownerOf(1) == msg.sender, "Err: Not owner.");

        _position.close();
        emit ClosePosition(msg.sender, _position.market(), _position);
    }

    /**
     * @dev Invoked automatically by `Pozition.sol` on ERC721._afterTokenTransfer.
     *
     * This function is invoked on all transfers, mints, and burns. Note that closing a Pozition does
     * not automatically burn the Pozition NFT. As such, the NFT will still remain 'available'
     * and transferrable until burnt.
     */
    function updateAllMintedPositions(
        address _from,
        address _to,
        address _position
    ) public {
        require(_position != address(0), "Err: Position is addr(0).");
        require(_from != _to, "Err: Same To/from address.");
        require(Pozition(_position).ownerOf(1) == _to, "Err: ownerOf must be _to");

        if (_from == address(0)) {
            allMintedPositions[_to].add(_position); // _mint
        } else {
            if (!allMintedPositions[_from].contains(_position)) {
                // NOTE: This could perhaps be too restrictive. If for whatever reason `allMintedPositions`
                // encounters a bug which results in invalid mappings, we may want to refresh the mapping by
                // calling this in the future.
                revert("Err: _from not original owner");
            }

            allMintedPositions[_from].remove(_position);
            allMintedPositions[_to].add(_position);

            // Only emit this event when operation is from _tansfer and not _burn.
            if (_to != address(0)) {
                emit TransferPosition(_from, _to, Pozition(_position));
            }
        }
    }

    /**
     * @dev Utility method combining `deposit` and `openPosition`.
     */
    function depositMarginAndOpenPosition(
        uint256 _margin,
        int256 _size,
        bytes32 _market
    ) external returns (Pozition position) {
        deposit(_margin);
        position = openPosition(_margin, _size, _market);
    }

    /// View Functions ///

    function mintedPositionsOf(address _owner) public view returns (address[] memory) {
        return allMintedPositions[_owner].values();
    }

    /// Events ///

    /**
     * @dev Emitted when the NFT is 'cloned', effectively minted with the necessary attributes.
     */
    event Clone(
        address owner,
        IFuturesMarket market,
        uint256 margin,
        int256 size,
        Pozition position
    );

    event WithdrawMargin(address from, address to, uint256 amount);
    event DepositMargin(address depositer, uint256 amount);
    event OpenPosition(
        address trader,
        uint256 margin,
        int256 size,
        IFuturesMarket market,
        Pozition position
    );
    event ClosePosition(address trader, IFuturesMarket market, Pozition position);
    event TransferPosition(address from, address to, Pozition position);
}
