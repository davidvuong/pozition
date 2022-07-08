import dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

// Sample `hardhat` task, similar to Gulp/Grunt.
//
// @see https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach((acc) => {
    console.log(acc.address);
  });
});

// @see: https://hardhat.org/config/ to learn more.
const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    'optimism-kovan': {
      url: process.env.OPTIMISM_KOVAN_URL!,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      // @see: `npx hardhat verify --list-networks`
      optimisticKovan: process.env.ETHERSCAN_API_KEY!,
    },
  },
};

export default config;
