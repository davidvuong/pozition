//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// Local Imports ///

import "./interfaces/IAddressResolver.sol";
import "./interfaces/IFuturesMarket.sol";

/**
 * @dev Contract to represent a single position opened on Synthetix Futures.
 *
 * Positions are created via this contract. All ownership is hence transferrable, allowing users to freely
 * move positions between wallets without closing, possibly incurring a loss, withdrawing margin, and
 * re-creating a new position.
 */
contract Pozition is Initializable, ERC721, Ownable {
    /// State Variables ///

    /**
     * @dev The futures market we're operating in e.g. sBTC/sUSD.
     */
    IFuturesMarket public market;

    /**
     * @dev The initial amount of margin used for this position when opened.
     */
    uint256 public margin;

    /**
     * @dev The size used when this position opened.
     */
    uint256 public size;

    /// Constructor ///

    constructor() ERC721("Future Pozitions", "FPZ") {}

    /**
     * @dev Returns the total number of tokens in existence.
     */
    function totalSupply() public pure returns (uint256) {
        return 1;
    }

    /// View Functions ///

    /**
     * @dev Returns true if the position is still open and hence closeable. False otherwise.
     */
    function isOpen() public view returns (bool) {
        (uint64 id, , , , ) = market.positions(address(this));
        return id != 0;
    }

    /// Mutative Functions ///

    /**
     * @dev Initializes this 1/1 NFT, passing and storing the necessary metadata for storage.
     *
     * This effectively mints the NFT. It's important to note that this NFT can only be minted once
     * so it coincides well with `initialize`. Upon `initializing`, the NFT is minted and transferred.
     */
    function initialize(
        IFuturesMarket _market,
        address _manager,
        uint256 _margin,
        uint256 _size
    ) public initializer {
        market = _market;
        margin = _margin;
        size = _size;

        // TODO: Add onlyOwner and transfer to Manager such that interactions must goes through the manager.
        // FuturesPositionsManager is the only SC to interact with FuturesNFTPosition after creation.
        // transferOwnership(_manager);
    }

    function openAndTransfer(address _trader) public {
        /// We're `int` casting here because contracts in Synthetix Futures account for negatives rather than splitting
        /// the operation into 2 functions (positive is deposit, negative is withdraw).
        ///
        /// This is also true for `depositMargin`.
        market.modifyPosition(int256(size));
        _mint(_trader, 1);
    }

    function closeAndBurn() public {
        market.closePosition();
        market.withdrawAllMargin();

        // TODO: Send this margin back to the Manager, ensuring this is owned by the user, not the NFT.

        _burn(1);
    }

    function depositMargin(uint256 _amount) public {
        market.transferMargin(int256(_amount));
    }
}
