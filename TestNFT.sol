// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("CryptoArt", "CART") {
        tokenCounter = 0;
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter = tokenCounter + 1;
        return tokenCounter - 1;
    }
}
