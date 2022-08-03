//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFuturesMarketManager {
    function allMarkets() external view returns (address[] memory);
}
