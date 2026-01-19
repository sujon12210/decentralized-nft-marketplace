const { ethers } = require("hardhat");
const config = require("./marketplace_config.json");

async function main() {
    const [seller] = await ethers.getSigners();
    const marketplace = await ethers.getContractAt("NFTMarketplace", config.marketplace, seller);
    const nft = await ethers.getContractAt("TestNFT", config.nft, seller);
    
    const tokenId = 0;
    const price = ethers.parseEther("1.0"); // 1 ETH

    console.log("Approving Marketplace...");
    await nft.approve(config.marketplace, tokenId);

    console.log(`Listing Token ${tokenId} for 1 ETH...`);
    const tx = await marketplace.listItem(config.nft, tokenId, price);
    await tx.wait();

    console.log("Item Listed Successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
