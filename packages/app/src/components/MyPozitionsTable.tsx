import classNames from "classnames";
import { BigNumber, Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { usePozitionContracts } from "../hooks/usePozitionContracts";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";
import { PositionSide } from "../typed";
import { prettyFormatBigNumber } from "../utils";

interface PozitionMetadata {
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
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { SynthUtil } = useSynthetixContracts();

  // TODO: Use the Pozition type generated from typechain here please!
  const [isLoadingPozitions, setIsLoadingPozitions] = useState(true);
  const [pozitions, setPozitions] = useState<PozitionMetadata[]>([]);
  const { data: signer } = useSigner({
    onError: (err) => console.error("Error", err),
  });
  const { PozitionManagerContract, PozitionAbi } = usePozitionContracts();

  useEffect(() => {
    (async () => {
      if (SynthUtil) {
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
      }
    })();
  }, [chain]);

  useEffect(() => {
    (async () => {
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
        console.log(parsedPozitions);
      } finally {
        setIsLoadingPozitions(false);
      }
    })();
  }, [address, signer]);

  return (
    <div className="bg-gray-200 shadow overflow-hidden rounded-lg max-w-7xl w-full">
      <ul role="list" className="divide-y divide-gray-800 bg-black-700 px-4">
        {pozitions.map((pozition) => (
          <li
            key={pozition.contract.address}
            className="flex items-center justify-between h-32"
          >
            <div className="flex space-x-4">
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/pozitions/${pozition.side.toLowerCase()}.png`
                }
                alt={`Pozition Side: ${pozition.side}`}
                className="flex h24 w-24 rounded-full"
                draggable={false}
              />
              <div className="flex flex-col justify-center space-y-2">
                <div className="flex flex-row items-center space-x-2">
                  {/* TODO: It's so gross how we have to adhoc remove or add the 's' prefix */}
                  <img
                    className="flex h-6 w-6 rounded-full bg-gray-200"
                    src={
                      process.env.PUBLIC_URL +
                      `/tokens/${pozition.marketKey.substring(1)}.webp`
                    }
                    draggable={false}
                  />
                  <h1 className="flex items-center text-3xl text-gray-200 font-light">
                    <span>{pozition.marketKey} / sUSD</span>
                    <span
                      className={classNames(
                        "ml-2 rounded-full uppercase px-2 text-xs font-semibold leading-5",
                        {
                          "text-green-800 bg-green-200": pozition.isOpen,
                          "text-red-800 bg-red-200": !pozition.isOpen,
                        }
                      )}
                    >
                      {pozition.isOpen ? "Open" : "Closed"}
                    </span>
                  </h1>
                </div>
                <p className="text-gray-200 font-light">
                  Est. PRICE ~$
                  {prettyFormatBigNumber(
                    synthRates[pozition.marketKey]
                  )} USD <span className="text-xs">&#9679;</span>{" "}
                  <span className="font-semibold">{pozition.side}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center h-32">
              <div className="flex flex-col justify-center px-2 h-28 w-48 border-r border-gray-800">
                <p className="flex uppercase text-gray-200 text-lg font-light">
                  Size / Margin
                </p>
                <p className="flex text-gray-200">
                  ~ {prettyFormatBigNumber(pozition.originalSize.abs())} / $
                  {prettyFormatBigNumber(pozition.originalMargin, "0", 2)} sUSD{" "}
                </p>
              </div>
              <div className="pl-4">
                <button className="uppercase text-gray-200 py-2 px-4 bg-gray-800 hover:bg-gray-600 rounded-lg">
                  Manage
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
