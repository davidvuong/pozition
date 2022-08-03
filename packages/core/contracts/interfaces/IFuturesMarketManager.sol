//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFuturesMarketManager {
    function marketsForKeys(bytes32[] calldata marketKeys)
        external
        view
        returns (address[] memory);
}
