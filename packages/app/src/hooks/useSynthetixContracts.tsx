import { ethers } from "ethers";
import { useAccount, useNetwork, useProvider } from "wagmi";
import { CHAIN_ADDRESSES, CHAIN_ABIS, SUPPORTED_CHAIN_IDS } from "../constants";

export const useSynthetixContracts = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider();

  const SYNTH_UTIL = chain ? CHAIN_ADDRESSES[chain.id]?.SYNTH_UTIL : undefined;
  const SYNTH_UTIL_ABI = chain
    ? CHAIN_ABIS[chain.id]?.SYNTH_UTIL_ABI
    : undefined;

  if (
    !chain ||
    !isConnected ||
    !SUPPORTED_CHAIN_IDS.includes(chain.id) ||
    !SYNTH_UTIL ||
    !SYNTH_UTIL_ABI
  ) {
    return { SynthUtil: undefined };
  }

  return {
    SynthUtil: new ethers.Contract(SYNTH_UTIL, SYNTH_UTIL_ABI, provider),
  };
};
