//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Imports ///

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

/// Local Imports ///

import "./PozitionManager.sol";
import "./interfaces/IAddressResolver.sol";
import "./interfaces/IFuturesMarket.sol";

/**
 * @dev Contract to represent a single position opened on Synthetix Futures.
 *
 * Positions are created via this contract. All ownership is hence transferrable, allowing users to freely
 * move positions between wallets without closing, possibly incurring a loss, withdrawing margin, and
 * re-creating a new position.
 */
contract Pozition is Initializable, ERC721 {
    /// State Variables ///

    /**
     * @dev The one and only ever tokenId for Pozition.
     */
    uint256 private constant _tokenId = 1;

    /**
     * @dev The futures market we're operating in e.g. sBTC/sUSD.
     */
    IFuturesMarket public market;

    /**
     * @dev The original amount of margin used for this position when opened.
     */
    uint256 public originalMargin;

    /**
     * @dev The original size used when this position opened.
     */
    int256 public originalSize;

    /**
     * @dev Address of the ERC20 margin token.
     */
    IERC20 public marginToken;

    /**
     * @dev Address of the PozitionManager that initialized this NFT.
     */
    PozitionManager public manager;

    /// Constructor ///

    constructor() ERC721("Pozition", "PONZI") {}

    /// Modifiers ///

    modifier onlyManager() {
        require(msg.sender == address(manager), "Err: OnlyManager");
        _;
    }

    /// View Functions ///

    /**
     * @dev Standard ERC721-metadata `name` function.
     *
     * We're explicitly overriding here because subsequent deploys via a minimal proxy clone doesn't
     * invoke the constructor (only initialzier). Hence, neither `symbol` or `name` will have a value.
     */
    function name() public view virtual override returns (string memory) {
        return "Pozition";
    }

    /**
     * @dev Standard ERC721-metadata `symbol` function.
     */
    function symbol() public view virtual override returns (string memory) {
        return "PONZI"; // hue hue hue.
    }

    /**
     * @dev Returns the total number of tokens in existence.
     */
    function totalSupply() public pure returns (uint256) {
        return 1;
    }

    /**
     * @dev Returns true if the position is still open and hence closeable. False otherwise.
     *
     * This seems like a common enough piece of information to want to wrap around for exposure.
     */
    function isOpen() public view returns (bool) {
        (, , , , int128 _size) = market.positions(address(this));
        return _size != 0;
    }

    function pozitionMetadata()
        external
        view
        returns (
            bool,
            uint256,
            int256,
            int256,
            bytes32,
            uint256,
            IFuturesMarket
        )
    {
        address me = address(this);

        // TODO: Deal with 2nd `invalid` argument.
        //
        // Docs don't say anything but this comes from `assetPrice`. Haven't dug into what it means to have an invalid
        // price.
        //
        // @see: https://github.com/Synthetixio/synthetix/blob/develop/contracts/MixinFuturesViews.sol#L81
        (uint256 remainingMargin, ) = market.remainingMargin(me);

        // TODO: This is also true for PnL.
        (int256 pnl, ) = market.profitLoss(me);

        // TODO: Kind of terrible that we return nameless data as an array. Perhaps a struct would be better here?
        //
        // Rather than the frontend making 7 API calls to fetch snippets of data in every pozition they want to
        // display, this view returns everything in one go.
        return (
            isOpen(),
            originalMargin,
            originalSize,
            pnl,
            market.marketKey(),
            remainingMargin,
            market
        );
    }

    /// Internal Functions ///

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 /* tokenId */
    ) internal override {
        manager.updateAllMintedPositions(from, to, this);
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
        uint256 _originalMargin,
        int256 _originalSize,
        IERC20 _marginToken,
        PozitionManager _manager
    ) public initializer {
        market = _market;
        originalMargin = _originalMargin;
        originalSize = _originalSize;
        marginToken = _marginToken;
        manager = _manager;
    }

    /** @dev Proxies into the operating market to open a new position. */
    function open(address _trader) public onlyManager {
        market.modifyPosition(originalSize);
        _mint(_trader, _tokenId);
    }

    /** @dev Proxies into the operating market to close an existing. */
    function close() public onlyManager {
        require(isOpen(), "Err: Position not open");

        market.closePosition();

        /// Withdraws all margin in `market` to this NFT and then transfer to owner.
        market.withdrawAllMargin();
        marginToken.transfer(ownerOf(_tokenId), marginToken.balanceOf(address(this)));
    }

    /** @dev Proxies into the operating market to Add more margin to an existing position. */
    function depositMargin(uint256 _amount) public onlyManager {
        require(isOpen(), "Err: Position not open");

        /// We're `int` casting here because contracts in Synthetix Futures account for negatives rather than splitting
        /// the operation into 2 functions (positive is deposit, negative is withdraw).
        market.transferMargin(int256(_amount));
    }
}
