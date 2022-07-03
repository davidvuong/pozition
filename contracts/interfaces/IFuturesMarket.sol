//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFuturesMarket {
    function transferMargin(int256 marginDelta) external;

    function closePosition() external;

    function modifyPosition(int256 sizeDelta) external;
}
