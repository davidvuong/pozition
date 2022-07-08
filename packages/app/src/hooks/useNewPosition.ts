import axios from 'axios';
import { BigNumber, constants, utils } from 'ethers';
import { URLBACKENDNFT } from '../constants/nft-backend';
import { useConnectWallet } from '../context/useConnectWalletContext';
import { useContract } from '../context/useContract';

export default function useNewPosition() {
  const { connector, provider } = useConnectWallet();
  const contracts = useContract();
  const calcDelta = async (data: {
    market: string;
    amount: string;
    side: 'long' | 'short';
    leverage: 1 | 2 | 5 | 10;
    link: number;
    bitcoin: number;
    ethereum: number;
  }) => {
    if (data.market === 'FuturesMarketBTC') {
      const delta = (Number(data.amount) * data.leverage) / data.bitcoin;
      const result = await axios({
        method: 'POST',
        url: URLBACKENDNFT.concat('token/generate-svg'),
        data: {
          side: data.side.toUpperCase(),
          market: data.market,
          wallet: connector?.accounts[0],
          size: delta,
          price: data.bitcoin,
        },
      });
      const txData = contracts[
        connector?.chainId as 10 | 69
      ].FuturesPositionManager?.interface.encodeFunctionData(
        'depositMarginAndOpenPosition',
        [
          utils.parseEther(data.amount),
          utils.parseEther(delta.toString()),
          utils.formatBytes32String(data.market),
          result.data.fullTokenURI,
        ]
      );

      connector?.sendTransaction({
        to: contracts[connector?.chainId as 10 | 69].FuturesPositionManager
          ?.address,
        data: txData,
        from: connector.accounts[0],
      });
    }
    if (data.market === 'FuturesMarketETH') {
      const delta = (Number(data.amount) * data.leverage) / data.ethereum;
      const result = await axios({
        method: 'POST',
        url: URLBACKENDNFT.concat('token/generate-svg'),
        data: {
          side: data.side.toUpperCase(),
          market: data.market,
          wallet: connector?.accounts[0],
          size: delta,
          price: data.ethereum,
        },
      });
      const txData = contracts[
        connector?.chainId as 10 | 69
      ].FuturesPositionManager?.interface.encodeFunctionData(
        'depositMarginAndOpenPosition',
        [
          utils.parseEther(data.amount),
          utils.parseEther(delta.toString()),
          utils.formatBytes32String(data.market),
          result.data.fullTokenURI,
        ]
      );

      connector?.sendTransaction({
        to: contracts[connector?.chainId as 10 | 69].FuturesPositionManager
          ?.address,
        data: txData,
        from: connector.accounts[0],
      });
    }

    const delta = (Number(data.amount) * data.leverage) / data.link;
    const result = await axios({
      method: 'POST',
      url: URLBACKENDNFT.concat('token/generate-svg'),
      data: {
        side: data.side.toUpperCase(),
        market: data.market,
        wallet: connector?.accounts[0],
        size: delta,
        price: data.link,
      },
    });
    const txData = contracts[
      connector?.chainId as 10 | 69
    ].FuturesPositionManager?.interface.encodeFunctionData(
      'depositMarginAndOpenPosition',
      [
        utils.parseEther(data.amount),
        utils.parseEther(delta.toString()),
        utils.formatBytes32String(data.market),
        result.data.fullTokenURI,
      ]
    );

    connector?.sendTransaction({
      to: contracts[connector?.chainId as 10 | 69].FuturesPositionManager
        ?.address,
      data: txData,
      from: connector.accounts[0],
    });
  };
  const approve = async () => {
    if (connector) {
      const data = contracts[
        connector.chainId as 10 | 69
      ].sUSD?.interface.encodeFunctionData('approve', [
        contracts[connector.chainId as 10 | 69].FuturesPositionManager?.address,
        constants.MaxUint256,
      ]);
      const res = await connector.sendTransaction({
        to: contracts[connector.chainId as 10 | 69].sUSD?.address,
        data,
        from: connector.accounts[0],
      });
      return res;
    }
    return;
  };
  const hasAllowance = async () => {
    if (provider && connector?.accounts.length) {
      const contract = contracts[connector.chainId as 10 | 69].sUSD!.connect(
        provider[connector.chainId as 10 | 69]!
      );
      const res: BigNumber = await contract.allowance(
        connector.accounts[0],
        contracts[connector.chainId as 10 | 69].FuturesPositionManager?.address
      );
      return res.gt(0);
    }
    return false;
  };
  return { calcDelta, hasAllowance, approve };
}
