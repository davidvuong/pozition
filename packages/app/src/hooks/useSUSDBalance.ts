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
import {
  CHAIN_ABIS,
  CHAIN_ADDRESSES,
  getDefaultChainId,
  SUPPORTED_CHAIN_IDS,
} from "../constants";

export const useSUSDBalance = () => {
  const [isApproved, setIsApproved] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const chainId = getDefaultChainId(chain);

  const sUSD = CHAIN_ADDRESSES[chainId].SUSD;
  const sUSDAbi = CHAIN_ABIS[chainId].SUSD_ABI;

  const { data: balance, isLoading: isLoadingSUSDBalance } = useBalance({
    addressOrName: address,
    token: sUSD,
    watch: true,
  });

  const sUSDContract = useContract({
    addressOrName: sUSD,
    contractInterface: sUSDAbi,
    // FIXME: Upon initial load `signer` isn't available and useContract wants a signer
    //
    // This throws an error in the console. However, once `signer` is loaded then we're good. Problem
    // is if we conditionally load this contract, React throws a fit due to inconsistent hooks.
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
    setIsApproved(true);
  };

  if (!chain || !isConnected || !SUPPORTED_CHAIN_IDS.includes(chain.id)) {
    return {
      balance: undefined,
      isLoadingSUSDBalance: false,
      hasAllownace,
      approve,
      isApproved,
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
