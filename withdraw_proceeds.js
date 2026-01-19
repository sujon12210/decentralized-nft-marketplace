const { ethers } = require("hardhat");
const config = require("./marketplace_config.json");

async function main() {
    const [seller] = await ethers.getSigners();
    const marketplace = await ethers.getContractAt("NFTMarketplace", config.marketplace, seller);

    const balanceBefore = await ethers.provider.getBalance(seller.address);
    console.log(`Seller Balance Before: ${ethers.formatEther(balanceBefore)} ETH`);

    console.log("Withdrawing proceeds...");
    const tx = await marketplace.withdrawProceeds();
    await tx.wait();

    const balanceAfter = await ethers.provider.getBalance(seller.address);
    console.log(`Seller Balance After: ${ethers.formatEther(balanceAfter)} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
