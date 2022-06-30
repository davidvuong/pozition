//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFuturesMarket {
    function transferMargin(int marginDelta) external;

    function closePosition() external;

    function modifyPosition(int sizeDelta) external;
}
