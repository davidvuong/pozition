//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFuturesMarket {
    function marketKey() external view returns (bytes32);

    function positions(address account)
        external
        view
        returns (
            uint64 id,
            uint64 fundingIndex,
            uint128 margin,
            uint128 lastPrice,
            int128 size
        );

    function transferMargin(int marginDelta) external;

    function remainingMargin(address account) external view returns (uint, bool);

    function profitLoss(address account) external view returns (int, bool);

    function closePosition() external;

    function modifyPosition(int sizeDelta) external;

    function withdrawAllMargin() external;
}
