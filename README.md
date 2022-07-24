# pozition

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![solidity - v0.6.12](https://img.shields.io/badge/solidity-v0.8.0-2ea44f?logo=solidity)](https://docs.soliditylang.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/35c89772-0682-4288-b5a1-28fd85ce1c38/deploy-status)](https://app.netlify.com/sites/pozition-app/deploys)

![Pozition Logo](./assets//funky-logo.png)

**Welcome to Pozition (Position but with a 'z')!**

Pozition was originally developed and dubbed during an [ETH NY](https://ethglobal.com/showcase/pozitions-c53qd) hackathon. This repository is a continuation of that project with the intent to build a fully production ready app used by real users. Note that :warn: **THIS PROJECT IS STILL WORK IN PROGRESS!**.

[Pozition](https://pozition.finance) aims to provide a mechanism to allow future positions on Synthetix to be transferrable. As of current, positions are tracked and managed directly by Synthetix. If you wanted to move a position from one wallet to another, you first have to close the position, withdraw your margin, and transfer sUSD to another wallet. This is quite tedious and may incur tax obligations/losses.

Using `pozition`, a 1/1 NFT is minted on every position, effectively giving the user a receipt to represent their position for each market they're participating in. The NFT is transferred to the user that opened the position and managed via the Pozition webapp. Doing this allows users to move positions freely without the hassle of closing a position and moving margin.

Interestingly, allowing users to trade positions in a decentralised manner opens the space to further derivatives. I'll leave that thought to the inclined reader.

**Website:** https://pozition.finance

## Development

```bash
# Clone the project for development.
git clone git@github.com:davidvuong/pozition.git

# Install all dependencies (note we are using yarn v2).
yarn

# Compile the SC package for development (typechain etc.)
yarn workspace @pozition/core compile

# Start the React app and integrate with a pre-existing SC on testnet.
yarn workspace @pozition/app start

# If you need to open up a new tab or one isn't created for you.
open localhost:3000
```

Further work...

```bash
# Start a local node if necessary.
yarn hardhat node

# Deploy smart contracts to Kovan testnet or Optimism mainnet.
yarn workspace @pozition/core deploy:kovan
yarn workspace @pozition/core deploy:mainnet
```

## Testing

This project follows the prescribed assertion and testrunner, `chai` and `mocha` respectively. To execute tests:

```bash
yarn workspace @pozition/core test
yarn workspace @pozition/core test:coverage
```

### Obtaining sUSD

Before you can do that, head over to [Paradigm](https://faucet.paradigm.xyz/) to drip ETH and DAI to your wallet. After, navigate to [Synthetix>Loans](https://staking.synthetix.io/) to borrow sUSD against your ETH. Now you have sUSD to experiment with.

## Etherscan Verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the `.env.example` file to a file named `.env`, and then edit it to fill in the details. Enter your Etherscan API key, your Optimism Kovan node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid `.env` file in place, first deploy your contract:

```bash
yarn workspace @pozition/core deploy:kovan
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```bash
yarn workspace @pozition/core hardhat verify --network optimistic-kovan DEPLOYED_CONTRACT_ADDRESS <constructor arg 1> <constructor arg 2...>
```

_This project uses Optimism so API keys must be created in https://optimistic.etherscan.io/_

## Design

Below is a high level overview of Pozition v1:

![Design Overview](assets/diagrams/architecture_overview_v1.jpg)

The primary deviation is the user interaction with Synthetix futures markets. Rather than directly invoking methods like `modifyPosition`, giving position ownerships to the user `msg.sender`, Pozition mints and manages interactions via NFTs.

An example workflow may look like:

1. User calls `deposit` on `Manager` to deposit `sUSD` as margin to open a position
1. User calls `openPosition` on `Manager`, specifying the market and size of their position
1. Manager invokes the `ERC721` factory to clone an existing implementation, immediately withdrawing the specified `sUSD` margin to the newly minted NFT
1. The NFT henceforth interacts with Synthetix futures, operating as a user normally would, had they traded on platforms such as Kwenta
1. After a position is created, ownership will associated to the NFT. The NFT is transferred to the user

_Assuming post `deposit`, all of this happens in a single transaction._

Pozition also provides helper methods to perform a deposit and trade in the same operation. Note that the inverse occurs when a position is closed and `sUSD` is deposited back to the `Manager` for withdrawl.

You may notice that this also includes a RESTful API to communicate with IPFS, invoked by the same user calling the Manager. The original project provided rich visual representation of future positions. SVG permutations (long/short, size, market) were generated off-chain and used as templates to generate new NFTs, feeding data about the position about to be opened.

Pozition v2 is much simpler:

![Design Overview (v2)](assets/diagrams/architecture_overview_v2.jpg)

Steps are largely the same. However, `Manager` and `Factory` has been merged and the need for a HTTP RESTful API and IPFS is no longer necessary.
