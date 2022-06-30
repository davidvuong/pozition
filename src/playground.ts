import './env';
import { BigNumber, ethers, providers } from 'ethers';
import type { FuturesMarginVault as FuturesMarginVaultType } from '../typechain/FuturesMarginVault';
import { FuturesMarginVault } from './contracts/FuturesMarginVault';
import { sUSDToken } from './contracts/sUSDToken';
import { OPTIMISM_NETWORKS } from './networks';

const main = async () => {
  console.log('Initialising');

  const provider = new providers.StaticJsonRpcProvider(OPTIMISM_NETWORKS[69].rpcUrls[0]);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const walletAddress = await wallet.getAddress();

  const onesUSD = BigNumber.from(10).pow(18);

  console.log('Approving sUSD on wallet');
  const sUSDContract = new ethers.Contract(sUSDToken.address, sUSDToken.abi, wallet);
  const futuresMarginVaultContract = new ethers.Contract(
    FuturesMarginVault.address,
    FuturesMarginVault.abi,
    wallet
  ) as FuturesMarginVaultType;

  await sUSDContract.approve(FuturesMarginVault.address, onesUSD.mul(2), {
    gasLimit: 500_000,
  });

  console.log('Depositing 2 sUSD');
  await futuresMarginVaultContract.deposit(onesUSD.mul(2), {
    gasLimit: 500_000,
  });

  console.log('Withdrawing 1 sUSD');
  await futuresMarginVaultContract.withdraw(onesUSD, {
    gasLimit: 500_000,
  });

  console.log('sUSD balance for current wallet');
  console.log((await futuresMarginVaultContract.depositsByWalletAddress(walletAddress)).toString());
};

main();
