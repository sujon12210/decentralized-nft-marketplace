const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    // 1. Deploy Marketplace
    const Marketplace = await ethers.getContractFactory("NFTMarketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.waitForDeployment();
    const marketAddr = await marketplace.getAddress();
    console.log("Marketplace deployed:", marketAddr);

    // 2. Deploy Mock NFT
    const NFT = await ethers.getContractFactory("TestNFT");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();
    const nftAddr = await nft.getAddress();
    console.log("NFT Contract deployed:", nftAddr);

    // Save Config
    const config = { marketplace: marketAddr, nft: nftAddr };
    fs.writeFileSync("marketplace_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
