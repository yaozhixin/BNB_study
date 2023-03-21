// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;
import "./interface.sol";
import "./BEP20.sol";

contract SuShiToken is Ownable, BEP20("SuShiToken", "SUSHI") {}
