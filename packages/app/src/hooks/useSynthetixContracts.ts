import { useContract, useNetwork, useProvider, useSigner } from "wagmi";
import { CHAIN_ADDRESSES, CHAIN_ABIS, getDefaultChainId } from "../constants";

export const useSynthetixContracts = () => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const chainId = getDefaultChainId(chain);

  const SYNTH_UTIL = CHAIN_ADDRESSES[chainId].SYNTH_UTIL;
  const SYNTH_UTIL_ABI = CHAIN_ABIS[chainId].SYNTH_UTIL_ABI;

  const SynthUtil = useContract({
    addressOrName: SYNTH_UTIL,
    contractInterface: SYNTH_UTIL_ABI,
    signerOrProvider: signer ?? provider,
  });

  return { SynthUtil };
};
