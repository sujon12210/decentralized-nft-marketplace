# Decentralized NFT Marketplace

![Solidity](https://img.shields.io/badge/solidity-^0.8.19-blue)
![ERC-721](https://img.shields.io/badge/standard-ERC721-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

**Decentralized NFT Marketplace** is a trustless exchange protocol. Unlike OpenSea (which uses off-chain order books), this marketplace stores all listings on-chain, ensuring true decentralization and censorship resistance.

## Features

-   **List Item**: Sellers approve the marketplace to transfer their NFT and set a price.
-   **Buy Item**: Buyers send ETH to purchase the NFT. The NFT is transferred instantly, and funds are stored for the seller.
-   **Update/Cancel**: Sellers can modify listings before a sale occurs.
-   **Pull Payments**: Sellers explicitly withdraw their earnings (security best practice to prevent reentrancy).

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Marketplace & Mock NFT
npx hardhat run deploy.js --network localhost

# 3. Mint an NFT (Seller)
node mint_nft.js

# 4. List the NFT for 1 ETH
node list_item.js

# 5. Buy the NFT (Buyer)
node buy_item.js

# 6. Seller Withdraws Earnings
node withdraw_proceeds.js
