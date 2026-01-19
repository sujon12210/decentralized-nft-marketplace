// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    event ItemListed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    event ItemBought(address indexed buyer, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    event ItemCanceled(address indexed seller, address indexed nftAddress, uint256 indexed tokenId);

    // NFT Contract Address -> Token ID -> Listing
    mapping(address => mapping(uint256 => Listing)) public listings;
    
    // Seller Address -> Amount Earned
    mapping(address => uint256) public proceeds;

    modifier isOwner(address nftAddress, uint256 tokenId, address spender) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        require(spender == owner, "Not token owner");
        _;
    }

    modifier isListed(address nftAddress, uint256 tokenId) {
        Listing memory listing = listings[nftAddress][tokenId];
        require(listing.price > 0, "Not listed");
        _;
    }

    function listItem(address nftAddress, uint256 tokenId, uint256 price) 
        external 
        isOwner(nftAddress, tokenId, msg.sender) 
    {
        require(price > 0, "Price must be > 0");
        IERC721 nft = IERC721(nftAddress);
        require(nft.getApproved(tokenId) == address(this), "Marketplace not approved");

        listings[nftAddress][tokenId] = Listing(price, msg.sender);
        emit ItemListed(msg.sender, nftAddress, tokenId, price);
    }

    function buyItem(address nftAddress, uint256 tokenId) 
        external 
        payable 
        nonReentrant 
        isListed(nftAddress, tokenId) 
    {
        Listing memory listing = listings[nftAddress][tokenId];
        require(msg.value == listing.price, "Incorrect price");

        // Delete listing first to prevent reentrancy
        delete listings[nftAddress][tokenId];
        
        // Add funds to seller's pull balance
        proceeds[listing.seller] += msg.value;

        IERC721(nftAddress).safeTransferFrom(listing.seller, msg.sender, tokenId);
        emit ItemBought(msg.sender, nftAddress, tokenId, listing.price);
    }

    function cancelListing(address nftAddress, uint256 tokenId) 
        external 
        isOwner(nftAddress, tokenId, msg.sender) 
        isListed(nftAddress, tokenId) 
    {
        delete listings[nftAddress][tokenId];
        emit ItemCanceled(msg.sender, nftAddress, tokenId);
    }

    function withdrawProceeds() external {
        uint256 amount = proceeds[msg.sender];
        require(amount > 0, "No proceeds");
        
        proceeds[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
