//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// 3rd Party Libraries ///

import "@openzeppelin/contracts/proxy/Clones.sol";

/// Local Imports ///

import "./Pozition.sol";

/**
 * @dev Allows the creation of a more 1/1 FuturePosition NFTs to be transferred to `msg.sender`.
 *
 * Keep in mind this factory follows a minimal proxy contract pattern where newly 'cloned' NFTs
 * simply point to a common implementation contract.
 *
 * _See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol_
 */
contract PozitionFactory {
    using Clones for address;

    /// State Variables ///

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

    /// Constructor ///

    constructor(address _implementation) {
        implementation = _implementation;
    }

    /// Mutative Functions ///

    /**
     * @dev Creates an exact copy of the `implementation` contract, following the minimal proxy pattern.
     *
     * IMPORTANT: `initialize` is not called here. It's expected the calling function will call `initialize` within
     * the same transaction as `clone`.
     *
     * TODO: How do I ensure that no one other than the FuturesPositionsManager can call this?
     */
    function clone(
        address _trader,
        IFuturesMarket _market,
        uint256 _margin,
        uint256 _size,
        string memory _fullTokenURI
    ) public returns (Pozition position) {
        position = Pozition(implementation.clone());
        position.initialize(_market, address(this), _margin, _size, _fullTokenURI);

        allMintedPositions[_trader].push(position);

        emit Clone(_trader, _market, _margin, _size, position);
    }
}
