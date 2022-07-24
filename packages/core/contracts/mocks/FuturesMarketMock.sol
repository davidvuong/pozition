//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

import "../interfaces/IFuturesMarket.sol";

contract FuturesMarketMock is IFuturesMarket {
    using Counters for Counters.Counter;

    bytes32 public marketKey = "sFAKE";

    bool public isNextCallReverted;

    Counters.Counter private positionCounter;

    modifier allowRevertable() {
        require(!isNextCallReverted, "Revert: Forced revert error");
        _;
    }

    function setNextCallRevertable(bool toBeReverted) external {
        isNextCallReverted = toBeReverted;
    }

    struct Position {
        uint64 id;
        uint64 fundingIndex;
        uint128 margin;
        uint128 lastPrice;
        int128 size;
    }

    struct Margin {
        int256 amount;
        bool isAvailable;
    }

    mapping(address => Position) public override positions;
    mapping(address => Margin) public margins;

    function transferMargin(int marginDelta) external override allowRevertable {
        Margin memory margin = margins[msg.sender];
        if (margin.isAvailable) {
            margin.amount += marginDelta;
        } else {
            margin = Margin({ amount: marginDelta, isAvailable: true });
            margins[msg.sender] = margin;
        }
        require(margin.amount > 0, "Error: Negative margin amount");
    }

    function withdrawAllMargin() external override {
        Margin memory margin = margins[msg.sender];
        delete margin.amount;
        delete margin.isAvailable;

        margins[msg.sender] = margin;
    }

    function closePosition() external override allowRevertable {
        Position memory position = positions[msg.sender];

        delete position.id;
        delete position.fundingIndex;
        delete position.margin;
        delete position.lastPrice;
        delete position.size;

        positions[msg.sender] = position;
    }

    function modifyPosition(int sizeDelta) external override allowRevertable {
        Position memory position = positions[msg.sender];
        if (position.id != 0) {
            position.size += int128(sizeDelta);
        } else {
            positionCounter.increment();
            positions[msg.sender] = Position({
                id: uint64(positionCounter.current()),
                fundingIndex: 1,
                margin: 1,
                lastPrice: 1,
                size: int128(sizeDelta)
            });
            position = positions[msg.sender];
        }
        require(position.size > 0, "Error: Negative size");
    }

    function remainingMargin(address account)
        external
        view
        returns (uint marginRemaining, bool invalid)
    {
        return (uint(margins[account].amount), false);
    }

    function profitLoss(
        address /* account */
    ) external pure returns (int pnl, bool invalid) {
        return (0, false);
    }
}
