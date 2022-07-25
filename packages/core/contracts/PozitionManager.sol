//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

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
    mapping(address => Pozition[]) private allMintedPositions;

    /// Constructor ///

    constructor(IAddressResolver _addressResolver, address _implementation) {
        addressResolver = _addressResolver;
        implementation = _implementation;

        address sUSD = addressResolver.getAddress("ProxyERC20sUSD");
        require(sUSD != address(0), "ProxyERC20sUSD not found.");
        marginToken = IERC20(sUSD);
    }

    /// Mutative Functions ///

    /**
     * @dev Creates an exact copy of the `implementation` contract, following the minimal proxy pattern.
     *
     * IMPORTANT: `initialize` is not called here. It's expected the calling function will call `initialize` within
     * the same transaction as `clone`.
     *
     * TODO: How do I ensure that no one other than the manager can call this?
     */
    function clone(
        address _trader,
        IFuturesMarket _market,
        uint256 _margin,
        int256 _size
    ) internal returns (Pozition position) {
        position = Pozition(implementation.clone());
        position.initialize(_market, _margin, _size, marginToken);

        allMintedPositions[_trader].push(position);

        emit Clone(_trader, _market, _margin, _size, position);
    }

    /**
     * @dev Deposit sUSD into the manager to be used as margin when opening positions.
     */
    function deposit(uint256 _amount) public {
        require(_amount > 0, "Deposit amount is too small.");
        require(
            marginToken.allowance(msg.sender, address(this)) >= _amount,
            "Approve sUSD token first!"
        );

        depositsByWalletAddress[msg.sender] += _amount;
        bool isSuccess = marginToken.transferFrom(msg.sender, address(this), _amount);
        require(isSuccess, "Deposit failed. Bad transfer.");

        emit DepositMargin(msg.sender, _amount);
    }

    /**
     * @dev Withdraw previously deposited sUSD from the manager. A `_receiver` is specified to signal
     * the address which will be receiving the sUSD upon a successful withdraw.
     */
    function withdraw(uint256 _amount, address _receiver) public nonReentrant {
        require(_amount > 0, "Withdraw amount is too small.");
        require(_receiver != address(0), "Receiver cannot be NULL.");
        require(depositsByWalletAddress[msg.sender] > 0, "No margin to withdraw.");
        require(
            depositsByWalletAddress[msg.sender] >= _amount,
            "Withdrawing more than available."
        );

        depositsByWalletAddress[msg.sender] -= _amount;
        bool isSuccess = marginToken.transfer(_receiver, _amount);
        require(isSuccess, "Withdraw failed, bad transfer.");

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
        // Is this necessary? Should be double up on `require` or can I rely on `withdraw`?
        require(_margin > 0, "Margin must be non-zero.");
        require(depositsByWalletAddress[msg.sender] >= _margin, "Not enough margin.");

        IFuturesMarket market = IFuturesMarket(addressResolver.getAddress(_market));

        // A non FuturesMarket contract but a registered contract on Synthetix can be called.
        //
        // TODO: What is an efficient way to check that only FuturesMarket contracts are specified?
        require(address(market) != address(0), "Market not supported.");

        position = Pozition(clone(msg.sender, market, _margin, _size));

        withdraw(_margin, address(position));

        position.depositMargin(_margin);
        position.openAndTransfer(msg.sender);

        emit OpenPosition(msg.sender, _margin, _size, market, position);
    }

    /**
     * @dev Given the `_position`, close if possible and withdraw all margin into the manager.
     *
     * TODO: Liquidated positions with remaining margin should ideally be deposited back into the manager
     * to be withdrawn or used in another position in the future but that is not currently implemented.
     */
    function closePosition(Pozition _position) external {
        require(_position.isOpen(), "Position is not open.");

        _position.closeAndBurn();
        emit ClosePosition(msg.sender, _position.market(), _position);
    }

    /**
     * @dev Invoked automatically by `Pozition.sol` when a transfer event occurs.
     *
     * A unidirectional Pozition transfer function. If the Pozition is already transferred then allMintedPositions
     * is simply updated. However, if not, this will invoke `.transfer` on `_position` and update state after.
     *
     * NOTE: We allow closed pozitions to be transferrable.
     *
     * TODO: How to cleanly only allow this function to be callable by newly created minimal proxy contracts? Or
     * perhaps better q, can we avoid using `allMintedPositions` to track pozitions altogether?
     */
    function transferPosition(Pozition _position, address _receiver) public {
        require(address(_position) != address(0), "Position is addr(0).");

        // `.transfer` call is invoked before this. Hence, we verify the _receiver is the ownerOf `_position`.
        // require(_position.owner() == _receiver, "Receiver is not the owner.");

        // The sender must the previous owner.
    }

    /// View Functions ///

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

    /**
     * @dev Returns all previously minted NFT positions.
     */
    function mintedPositionsOf(address trader) public view returns (Pozition[] memory) {
        // TODO: Fix this. This is not scalable. Need some kind of pagination.
        //
        // I wonder how efficient data structures are in Solidity? What if I want to sort or filter?
        return allMintedPositions[trader];
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

    event WithdrawMargin(address withdrawer, address receiver, uint256 amount);
    event DepositMargin(address depositer, uint256 amount);
    event OpenPosition(
        address trader,
        uint256 margin,
        int256 size,
        IFuturesMarket market,
        Pozition position
    );
    event ClosePosition(address trader, IFuturesMarket market, Pozition position);
    event TransferPosition(address owner, address receiver, Pozition position);
}
