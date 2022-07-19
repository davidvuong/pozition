import { BigNumber, ethers } from "ethers";
import { DEFAULT_MARKET, SUPPORTED_CHAIN_IDS, Market } from "../constants";
import { useAccount, useNetwork } from "wagmi";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";
import { useEffect, useState } from "react";
import { NewPozitionForm } from "../components/NewPozitionForm";
import { SelectMarketRadioGroup } from "../components/SelectMarketRadioGroup";
import { usePozitionContracts } from "../hooks/usePozitionContracts";

export const CreatePozitionPage = () => {
  const [synthRates, setSynthRates] = useState<Record<string, BigNumber>>({});
  const [selectedMarket, setSelectedMarket] = useState<Market>(DEFAULT_MARKET);
  const [isSelectingMarket, setIsSelectingMarket] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { SynthUtil } = useSynthetixContracts();
  const { PozitionManager } = usePozitionContracts();

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

  if (
    !isConnected ||
    !chain?.id ||
    !SUPPORTED_CHAIN_IDS.includes(chain.id) ||
    !SynthUtil
  ) {
    return (
      <section className="flex flex-col items-center justify-center uppercase text-gray-200 w-full h-full">
        <p>Connect your wallet / Wrong network</p>
      </section>
    );
  }

  const handleOnSwitch = () => setIsSelectingMarket(!isSelectingMarket);

  return (
    // TODO: Consider refactor market selection/form input to use NewPozitionContext.
    <section className="flex flex-col my-14 w-full items-center font-light text-sm">
      {!isSelectingMarket ? (
        <NewPozitionForm
          market={selectedMarket}
          synthRates={synthRates}
          onSwitch={handleOnSwitch}
        />
      ) : (
        <SelectMarketRadioGroup
          selected={selectedMarket}
          synthRates={synthRates}
          onSelect={setSelectedMarket}
          onSwitch={handleOnSwitch}
        />
      )}
    </section>
  );
};
