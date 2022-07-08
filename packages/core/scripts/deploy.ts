import { ethers, network } from 'hardhat';

enum SupportedNetworks {
  'optimistic-mainnet' = 'optimistic-mainnet',
  'optimistic-kovan' = 'optimistic-kovan',
}

const main = async () => {
  // Network specific deployment configuration.
  //
  // @see: https://docs.synthetix.io/addresses/
  const config = {
    'optimistic-mainnet': {
      baseURI: 'https://optimistic.etherscan.io/address',
      addressResolver: '0x95A6a3f44a70172E7d50a9e28c85Dfd712756B8C',
    },
    'optimistic-kovan': {
      baseURI: 'https://kovan-optimistic.etherscan.io/address',
      addressResolver: '0xb08b62e1cdfd37eCCd69A9ACe67322CCF801b3A6',
    },
  };

  const operatingNetwork = config[network.name as SupportedNetworks];
  if (!operatingNetwork) {
    throw new Error(`Missing configuration for network: '${network.name}'`);
  }

  const { baseURI, addressResolver } = operatingNetwork;

  const Pozition = await ethers.getContractFactory('Pozition');
  const pozition = await Pozition.deploy();
  await pozition.deployed();
  console.log(`Deployed Pozition: ${baseURI}/${pozition.address} (${pozition.address})`);

  const PozitionManager = await ethers.getContractFactory('PozitionManager');
  const pozitionManager = await PozitionManager.deploy(addressResolver, pozition.address);
  await pozitionManager.deployed();
  console.log(`Deployed PozitionManager: ${baseURI}/${pozitionManager.address} (${pozitionManager.address})`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
