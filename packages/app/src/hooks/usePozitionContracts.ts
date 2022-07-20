import { Artifacts } from "@pozition/core";
import { useAccount, useContract, useNetwork } from "wagmi";
import { CHAIN_ADDRESSES, SUPPORTED_CHAIN_IDS } from "../constants";

export const usePozitionContracts = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

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
  });

  return { PozitionManagerContract };
};
