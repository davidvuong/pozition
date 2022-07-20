import { ethers, constants } from "ethers";
import { useEffect, useState } from "react";
import {
  useAccount,
  useNetwork,
  useBalance,
  useContract,
  useSigner,
  useProvider,
} from "wagmi";
import { CHAIN_ABIS, CHAIN_ADDRESSES, SUPPORTED_CHAIN_IDS } from "../constants";

export const useSUSDBalance = () => {
  const [isApproved, setIsApproved] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();

  // Adding a default chain when not connected. Good idea? If so, expand to rest of components.
  const sUSD = chain
    ? CHAIN_ADDRESSES[chain.id]?.SUSD
    : CHAIN_ADDRESSES[69].SUSD;
  const sUSDAbi = chain
    ? CHAIN_ABIS[chain.id]?.SUSD_ABI
    : CHAIN_ABIS[69].SUSD_ABI;

  const { data: balance, isLoading: isLoadingSUSDBalance } = useBalance({
    addressOrName: address,
    token: sUSD,
  });

  const sUSDContract = useContract({
    addressOrName: sUSD,
    contractInterface: sUSDAbi,
    signerOrProvider: signer ?? provider,
  });

  useEffect(() => {
    (async () => {
      setIsApproved(await hasAllownace());
    })();
  }, []);

  const hasAllownace = async (): Promise<boolean> => {
    if (!isConnected) {
      return false;
    }
    const allowance: ethers.BigNumber = await sUSDContract.allowance(
      address,
      CHAIN_ADDRESSES[chain!.id].POZITION_MANAGER
    );
    return allowance.gt(0);
  };

  const approve = async (amount = constants.MaxUint256) => {
    if (!isConnected) {
      return;
    }
    await sUSDContract.approve(
      CHAIN_ADDRESSES[chain!.id].POZITION_MANAGER,
      amount
    );
  };

  if (!chain || !isConnected || !SUPPORTED_CHAIN_IDS.includes(chain.id)) {
    return {
      balance: undefined,
      isLoadingSUSDBalance: false,
      hasAllownace,
      approve,
    };
  }
  return {
    balance,
    isLoadingSUSDBalance,
    hasAllownace,
    approve,
    isApproved,
  };
};
