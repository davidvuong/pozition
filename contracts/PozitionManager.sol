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
    mapping(address => Pozition[]) public allMintedPositions;

    /// Events ///

    /**
     * @dev Emitted when the NFT is 'cloned', effectively minted with the necessary attributes.
     */
    event Clone(
        address owner,
        IFuturesMarket market,
        uint256 margin,
        uint256 size,
        Pozition position
    );

    /**
     * @dev Emitted when the implementation is updated by the owner.
     *
     * NOTE: Probably not needed right now but keeping this here.
     */
    event ImplementationChange(
        address oldImplementation,
        address newImplementation,
        address updater
    );

    /**
     * @dev Emitted with `amount` sUSD tokens are withdrawn from the margin vault by the `withdrawer`.
     */
    event Withdraw(address withdrawer, address receiver, uint256 amount);

    /**
     * @dev Emitted with `amount` when `depositer` deposits sUSD.
     */
    event Deposit(address depositer, uint256 amount);

    /**
     * @dev Emitted when a position is successfully opened.
     */
    event PositionOpen(
        address trader,
        uint256 margin,
        uint256 size,
        IFuturesMarket market,
        Pozition position
    );

    /**
     * @dev Emitted when a position is successfully opened.
     */
    event PositionClose(address trader, IFuturesMarket market, Pozition position);

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
        uint256 _size,
        string memory _fullTokenURI
    ) internal returns (Pozition position) {
        position = Pozition(implementation.clone());
        position.initialize(_market, address(this), _margin, _size, _fullTokenURI);

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

        emit Deposit(msg.sender, _amount);
    }

    /**
     * @dev Withdraw previously deposited sUSD from the manager. A `_receiver` is specified to signal
     * the address which will be receiving the sUSD upon a successful withdraw.
     */
    function withdraw(uint256 _amount, address _receiver) public nonReentrant {
        require(_amount > 0, "Withdraw amount is too small.");
        require(_receiver != address(0), "Receiver cannot be NULL.");
        require(
            depositsByWalletAddress[msg.sender] >= _amount,
            "Withdrawing more than available."
        );

        depositsByWalletAddress[msg.sender] -= _amount;
        bool isSuccess = marginToken.transfer(_receiver, _amount);
        require(isSuccess, "Withdraw failed, bad transfer.");

        emit Withdraw(msg.sender, _receiver, _amount);
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
        uint256 _size,
        bytes32 _market,
        string memory _fullTokenURI
    ) public returns (Pozition position) {
        // Is this necessary? Should be double up on `require` or can I rely on `withdraw`?
        require(_margin > 0, "Margin must be non-zero.");
        require(depositsByWalletAddress[msg.sender] >= _margin, "Not enough margin.");

        IFuturesMarket market = IFuturesMarket(addressResolver.getAddress(_market));
        require(address(market) != address(0), "Market not supported.");

        position = Pozition(clone(msg.sender, market, _size, _margin, _fullTokenURI));

        withdraw(_margin, address(position));

        position.depositMargin(_margin);
        position.openAndTransfer(msg.sender);

        emit PositionOpen(msg.sender, _margin, _size, market, position);
    }

    /**
     * @dev Given the `_position`, close if possible and withdraw all margin into the manager.
     *
     * TODO: Liquidated positions with remaining margin should ideally be deposited back into the manager
     * to be withdrawn or used in another position in the future but that is not currently implemented.
     */
    function closePosition(Pozition _position) external {
        _position.closeAndBurn();
        emit PositionClose(msg.sender, _position.market(), _position);
    }

    /**
     * @dev Utility method combining `deposit` and `openPosition`.
     */
    function depositMarginAndOpenPosition(
        uint256 _margin,
        uint256 _size,
        bytes32 _market,
        string memory _fullTokenURI
    ) external returns (Pozition position) {
        // TODO: This can probably be a lot more efficient. Depositing then immediately withdrawing.
        deposit(_margin);
        position = openPosition(_margin, _size, _market, _fullTokenURI);
    }
}
