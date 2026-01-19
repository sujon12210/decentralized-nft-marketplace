const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./marketplace_config.json");

async function main() {
    const [seller] = await ethers.getSigners();
    const nft = await ethers.getContractAt("TestNFT", config.nft, seller);

    console.log("Minting NFT for seller...");
    const tx = await nft.mintNft();
    const receipt = await tx.wait();
    
    // In this simple mock, the first token is ID 0
    console.log("Minted Token ID: 0");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
