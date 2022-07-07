import { ethers } from 'hardhat';

export const SUPPORTED_MARKETS = [
  'FuturesMarketETH',
  'FuturesMarketLINK',
  'FuturesMarketMATIC',
  'FuturesMarketSOL',
  'FuturesMarketUNI',
];

export const deployAllContracts = async () => {
  const sUSDTotalSupply = ethers.BigNumber.from(1_000_000);

  const SUSDToken = await ethers.getContractFactory('ERC20Mock');
  const sUSDToken = await SUSDToken.deploy(sUSDTotalSupply);
  await sUSDToken.deployed();

  const AddressResolver = await ethers.getContractFactory('AddressResolverMock');
  const addressResolver = await AddressResolver.deploy();
  await addressResolver.deployed();

  const regsiterAddressTx = await addressResolver.registerAddress(
    ethers.utils.formatBytes32String('ProxyERC20sUSD'),
    sUSDToken.address
  );
  await regsiterAddressTx.wait();

  const Pozition = await ethers.getContractFactory('Pozition');
  const pozition = await Pozition.deploy();
  await pozition.deployed();

  const PozitionManager = await ethers.getContractFactory('PozitionManager');
  const pozitionManager = await PozitionManager.deploy(addressResolver.address, pozition.address);
  await pozitionManager.deployed();

  const markets: Record<string, string> = {};
  for (const market of SUPPORTED_MARKETS) {
    const FuturesMarket = await ethers.getContractFactory('FuturesMarketMock');
    const futuresMarket = await FuturesMarket.deploy();
    await futuresMarket.deployed();

    const registerAddressTx = await addressResolver.registerAddress(
      ethers.utils.formatBytes32String(market),
      futuresMarket.address
    );
    await registerAddressTx.wait();

    markets[market] = futuresMarket.address;
  }

  return { sUSDToken, addressResolver, pozition, pozitionManager, sUSDTotalSupply, markets };
};
