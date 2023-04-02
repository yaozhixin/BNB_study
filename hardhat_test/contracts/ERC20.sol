// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract MyToken is ERC20 {
    // Variables
    uint256 public constant INITIAL_SUPPLY = 100;
    uint256 public constant MINT_AMOUNT = 10;
    address public owner;
    mapping(address => bool) public alreadyMinted;

    // Events
    event Mint(address indexed _user, uint256 _amount);
    event Burn(address indexed _user, uint256 _amount);
    
    // Constructor
    constructor() ERC20("MyToken", "MTK") {
        owner = msg.sender; // set owner to the creator of the contract
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    // Functions
    function mint() external {
        require(!alreadyMinted[msg.sender], "Already minted.");

        console.log("\n Balance before mint is ", balanceOf(msg.sender), "\n");
        
        _mint(msg.sender, MINT_AMOUNT); // 1 million tokens, 18 decimals
        alreadyMinted[msg.sender] = true;

         console.log("\n Balance after mint is ", balanceOf(msg.sender), "\n");

        emit Mint(msg.sender, MINT_AMOUNT);
    }

    function burn(address _user) external onlyOwner {
        uint256 _amount = balanceOf(_user);
        _burn(_user, _amount);
        delete alreadyMinted[_user];

        emit Burn(_user, _amount);
    }

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256
    ) internal pure override {
        require(
            _from == address(0) || _to == address(0),
            "Transfer not allowed."
        );
    }
}