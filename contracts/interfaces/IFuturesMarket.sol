//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface FuturesMarket {
  function transferMargin(int marginDelta) external;
  function closePosition() external;
  function modifyPosition(int sizeDelta) external;
}
