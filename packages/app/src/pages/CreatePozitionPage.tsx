import { BigNumber, ethers } from "ethers";
import { DEFAULT_MARKET, SUPPORTED_CHAIN_IDS, Market } from "../constants";
import { useAccount, useNetwork } from "wagmi";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";
import { useEffect, useState } from "react";
import { NewPozitionForm } from "../components/NewPozitionForm";
import { SelectMarketRadioGroup } from "../components/SelectMarketRadioGroup";
import styled from "styled-components";

const Section = styled.section.attrs({
  className: `
    flex
    flex-col
    items-center
    justify-center
    w-full
    h-full
  `,
})``;

const BlanketErrorMessage = styled.p.attrs({
  className: `
    text-gray-200
    uppercase
    p-2
    rounded-2xl
  `,
})``;

export const CreatePozitionPage = () => {
  const [synthRates, setSynthRates] = useState<Record<string, BigNumber>>({});
  const [selectedMarket, setSelectedMarket] = useState<Market>(DEFAULT_MARKET);
  const [isSelectingMarket, setIsSelectingMarket] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { SynthUtil } = useSynthetixContracts();

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

  const handleOnSwitch = () => setIsSelectingMarket(!isSelectingMarket);

  if (!isConnected || !chain?.id || !SynthUtil) {
    return (
      <Section>
        <BlanketErrorMessage>Please connect wallet</BlanketErrorMessage>
      </Section>
    );
  }
  if (!SUPPORTED_CHAIN_IDS.includes(chain.id)) {
    return (
      <Section>
        <BlanketErrorMessage>Oops! Unsupported Network</BlanketErrorMessage>
      </Section>
    );
  }
  if (isSelectingMarket) {
    return (
      <Section>
        <SelectMarketRadioGroup
          selected={selectedMarket}
          synthRates={synthRates}
          onSelect={setSelectedMarket}
          onSwitch={handleOnSwitch}
        />
      </Section>
    );
  }
  return (
    <Section>
      <NewPozitionForm
        market={selectedMarket}
        synthRates={synthRates}
        onSwitch={handleOnSwitch}
      />
    </Section>
  );
};
