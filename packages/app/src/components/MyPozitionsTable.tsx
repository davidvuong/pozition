import { BigNumber, Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { usePozitionContracts } from "../hooks/usePozitionContracts";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";
import { PositionSide } from "../typed";
import { MyPozitionsTableRow } from "./MyPozitionsTableRow";

export interface PozitionMetadata {
  contract: Contract;
  isOpen: boolean;
  originalMargin: BigNumber;
  originalSize: BigNumber;
  pnl: BigNumber;
  marketKey: string;
  remainingMargin: BigNumber;
  market: string;
  side: PositionSide;
}

export const MyPozitionsTable = () => {
  // TODO: Move this into a context provider and share data across components.
  const [synthRates, setSynthRates] = useState<Record<string, BigNumber>>({});
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { SynthUtil } = useSynthetixContracts();

  // TODO: Use the Pozition type generated from typechain here please!
  const [isLoadingPozitions, setIsLoadingPozitions] = useState(true);
  const [pozitions, setPozitions] = useState<PozitionMetadata[]>([]);
  const { data: signer } = useSigner({
    onError: (err) => console.error("Error", err),
  });
  const { PozitionManagerContract, PozitionAbi } = usePozitionContracts();

  const fetchSynthRates = async () => {
    if (!SynthUtil) {
      return;
    }
    const [tokens, rates] = await SynthUtil.synthsRates();
    setSynthRates(
      tokens.reduce(
        (acc: Record<string, BigNumber>, token: string, idx: number) => {
          acc[ethers.utils.parseBytes32String(token)] = rates[idx];
          return acc;
        },
        {} as Record<string, BigNumber>
      )
    );
  };

  const fetchPozitions = async () => {
    if (!address || !signer) {
      return;
    }
    try {
      setIsLoadingPozitions(true);

      const mintedPositionAddresses: string[] =
        await PozitionManagerContract.mintedPositionsOf(address);
      const contracts = mintedPositionAddresses.map(
        (addr) => new Contract(addr, PozitionAbi, signer)
      );
      const parsedPozitions = await Promise.all(
        contracts.map(async (contract) => {
          const [
            isOpen,
            originalMargin,
            originalSize,
            pnl,
            marketKey,
            remainingMargin,
            market,
          ] = await contract.pozitionMetadata();
          return {
            contract,
            isOpen,
            originalMargin,
            originalSize,
            pnl,
            marketKey: ethers.utils.parseBytes32String(marketKey),
            remainingMargin,
            market,
            side: originalSize.lt(0) ? PositionSide.SHORT : PositionSide.LONG,
          };
        })
      );

      // Reverse here so we showe the most recently created positions at the top (SC is an append-only array).
      setPozitions(parsedPozitions.reverse());
    } finally {
      setIsLoadingPozitions(false);
    }
  };

  useEffect(() => {
    fetchSynthRates();
  }, [chain]);

  useEffect(() => {
    fetchPozitions();
  }, [address, signer]);

  return (
    <div className="shadow overflow-hidden rounded-lg max-w-7xl w-full mb-12">
      <ul role="list" className="divide-y divide-gray-800 bg-black-700">
        {pozitions.map((pozition) => (
          <MyPozitionsTableRow
            key={pozition.contract.address}
            pozition={pozition}
            synthRates={synthRates}
          />
        ))}
      </ul>
    </div>
  );
};
