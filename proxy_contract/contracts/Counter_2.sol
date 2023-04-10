// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Counter_2 {
    uint256 public constant Version = 2;
    uint256 private count;
    bool private initialized;

    modifier initializer() {
        require(!initialized, "Only initialize once");
        _;
        initialized = true;
    }

    function initialize(uint256 _initValue) public initializer {
        count = _initValue;
    }


    event CountIncreased(uint256 newCount);
    event CountDecreased(uint256 newCount);

    function increment() public {
        count += 1;
        emit CountIncreased(count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function getVersion() public pure returns (uint256) {
        return Version;
    }

    function decrement() public {
        count -= 1;
        emit CountDecreased(count);
    }

}