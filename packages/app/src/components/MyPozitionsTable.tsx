import { RefreshIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { BigNumber, Contract, ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useSigner } from "wagmi";
import { SynthMarketContext } from "../context/SynthMarket";
import { usePozitionContracts } from "../hooks/usePozitionContracts";
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
  const navigate = useNavigate();
  const { address } = useAccount();
  const { refreshSynths } = useContext(SynthMarketContext);

  // TODO: Use the Pozition type generated from typechain here please!
  const [isLoadingPozitions, setIsLoadingPozitions] = useState(true);
  const [pozitions, setPozitions] = useState<PozitionMetadata[]>([]);
  const { data: signer } = useSigner({
    onError: (err) => console.error("Error", err),
  });
  const { PozitionManagerContract, PozitionAbi } = usePozitionContracts();

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
    fetchPozitions();
    setIsLoadingPozitions(true);
  }, [address, signer]);

  const handleRefresh = async () => {
    fetchPozitions();
    refreshSynths();
  };

  const handleOpenNewPozition = () => navigate("/pozition");

  if (pozitions.length === 0) {
    if (isLoadingPozitions) {
      return (
        <div className="flex flex-col mt-16 text-gray-200 uppercase p-2 rounded-2xl">
          <p>Hold on tight. Loading your Pozitions...</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col mt-16 text-gray-200 uppercase p-2 rounded-2xl">
          <p>My guy... You have no Pozitions.</p>
          <button
            className="mt-8 p-2 bg-gray-800 uppercase rounded-lg hover:bg-gray-700"
            onClick={() => handleOpenNewPozition()}
          >
            Open a new Pozition
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col space-y-2 shadow overflow-hidden rounded-lg max-w-7xl w-full mb-12">
      <div className="flex flex-row justify-end items-center space-x-2 w-full">
        <span className="text-gray-200 text-sm font-light">
          # Ponzitions: {pozitions.length}
        </span>
        <button type="button" onClick={() => handleRefresh()}>
          <RefreshIcon className="h-6 w-6 text-gray-200 hover:text-gray-400" />
        </button>
      </div>
      <ul
        role="list"
        className={classNames("divide-y divide-gray-800 bg-black-700", {
          "opacity-50": isLoadingPozitions,
        })}
      >
        {pozitions.map((pozition) => (
          <MyPozitionsTableRow
            key={pozition.contract.address}
            pozition={pozition}
          />
        ))}
      </ul>
    </div>
  );
};
