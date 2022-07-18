import { useAccount, useNetwork, useBalance } from "wagmi";
import { CHAIN_ADDRESSES, SUPPORTED_CHAIN_IDS } from "../constants";

export const useSUSDBalance = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const SUSD = chain ? CHAIN_ADDRESSES[chain.id]?.SUSD : undefined;
  const { data: balance, isLoading: isLoadingSUSDBalance } = useBalance({
    addressOrName: address,
    token: SUSD,
  });

  if (!chain || !isConnected || !SUPPORTED_CHAIN_IDS.includes(chain.id)) {
    return { balance: undefined, isLoadingSUSDBalance: false };
  }

  return { balance, isLoadingSUSDBalance };
};
