const { ethers } = require("hardhat");
const config = require("./marketplace_config.json");

async function main() {
    const [_, buyer] = await ethers.getSigners(); // Use 2nd account
    const marketplace = await ethers.getContractAt("NFTMarketplace", config.marketplace, buyer);
    
    const tokenId = 0;
    const price = ethers.parseEther("1.0");

    console.log(`Buyer ${buyer.address} purchasing Token ${tokenId}...`);

    const tx = await marketplace.buyItem(config.nft, tokenId, { value: price });
    await tx.wait();

    console.log("Purchase Successful!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
