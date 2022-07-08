//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../interfaces/IAddressResolver.sol";

contract AddressResolverMock is IAddressResolver {
    mapping(bytes32 => address) public repository;

    function registerAddress(bytes32 name, address destination) external {
        repository[name] = destination;
    }

    function getAddress(bytes32 name) external view override returns (address) {
        return repository[name];
    }

    function getSynth(bytes32 key) external view override returns (address) {
        return repository[key];
    }

    function requireAndGetAddress(bytes32 name, string calldata reason)
        external
        view
        override
        returns (address)
    {
        address _foundAddress = repository[name];
        require(_foundAddress != address(0), reason);
        return _foundAddress;
    }
}
