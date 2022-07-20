import { Artifacts } from "@pozition/core";
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from "wagmi";
import { CHAIN_ADDRESSES, SUPPORTED_CHAIN_IDS } from "../constants";

export const usePozitionContracts = () => {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const provider = useProvider();

  const pozitionManagerAddress = chain
    ? CHAIN_ADDRESSES[chain.id]?.POZITION_MANAGER
    : undefined;

  if (
    !chain ||
    !isConnected ||
    !SUPPORTED_CHAIN_IDS.includes(chain.id) ||
    !pozitionManagerAddress
  ) {
    return { PozitionManagerContract: undefined };
  }

  const PozitionManagerContract = useContract({
    addressOrName: pozitionManagerAddress,
    contractInterface: Artifacts.PozitionManager.abi,
    signerOrProvider: signer ?? provider,
  });

  return { PozitionManagerContract };
};
