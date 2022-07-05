//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../interfaces/IFuturesMarket.sol";

contract FuturesMarketMock is IFuturesMarket {
    bool public isNextCallReverted;

    modifier allowRevertable() {
        require(!isNextCallReverted, "Revert: Forced revert error");
        _;
    }

    function setNextCallRevertable(bool toBeReverted) external {
        isNextCallReverted = toBeReverted;
    }

    struct Position {
        bool isOpen;
        int256 size;
    }

    struct Margin {
        int256 amount;
        bool isAvailable;
    }

    mapping(address => Position) public positions;
    mapping(address => Margin) public margins;

    function transferMargin(int256 marginDelta) external override allowRevertable {
        Margin memory margin = margins[msg.sender];
        if (margin.isAvailable) {
            margin.amount += marginDelta;
        } else {
            margin = Margin({ amount: marginDelta, isAvailable: true });
            margins[msg.sender] = margin;
        }
        require(margin.amount < 0, "Error: Negative margin amount");
    }

    function closePosition() external override allowRevertable {
        Position memory position = positions[msg.sender];

        require(position.isOpen, "Error: Position not open");
        position.isOpen = false;

        positions[msg.sender] = position;
    }

    function modifyPosition(int256 sizeDelta) external override allowRevertable {
        Position memory position = positions[msg.sender];
        if (position.isOpen) {
            position.size += sizeDelta;
            require(position.size < 0, "Error: Negative size");
        } else {
            positions[msg.sender] = Position({ isOpen: true, size: sizeDelta });
        }
    }
}
