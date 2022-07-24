import { Artifacts } from "@pozition/core";
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from "wagmi";
import { CHAIN_ADDRESSES, SUPPORTED_CHAIN_IDS } from "../constants";

// TODO: Add context manager to deal with state from PozitionManager calls
// TODO: Update ts-loader to use typechain generated type

export const usePozitionContracts = () => {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const provider = useProvider();

  const pozitionManagerAddress = chain
    ? CHAIN_ADDRESSES[chain.id]?.POZITION_MANAGER
    : undefined;

  const PozitionManagerAbi = Artifacts.PozitionManager.abi;
  const PozitionAbi = Artifacts.Pozition.abi;

  if (
    !chain ||
    !isConnected ||
    !SUPPORTED_CHAIN_IDS.includes(chain.id) ||
    !pozitionManagerAddress
  ) {
    return {
      PozitionManagerContract: undefined,
      PozitionManagerAbi,
      PozitionAbi,
    };
  }

  const PozitionManagerContract = useContract({
    addressOrName: pozitionManagerAddress,
    contractInterface: PozitionManagerAbi,
    signerOrProvider: signer ?? provider,
  });

  return { PozitionManagerContract, PozitionManagerAbi, PozitionAbi };
};
