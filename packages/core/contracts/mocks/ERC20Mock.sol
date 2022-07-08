//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor(uint256 totalSupply) ERC20("ERC20Mock", "ERCM") {
        _mint(msg.sender, totalSupply);
    }
}
