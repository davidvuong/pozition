import styled from "styled-components";
import { BigNumber, ethers } from "ethers";
import { useAccount, useNetwork } from "wagmi";
import { DEFAULT_MARKET, SUPPORTED_CHAIN_IDS, Market } from "../constants";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";
import { useEffect, useState } from "react";
import { NewPozitionForm } from "../components/NewPozitionForm";
import { SelectMarketRadioGroup } from "../components/SelectMarketRadioGroup";
import { PageHeaderTitle } from "../components/PageHeaderTitle";

const SharedSectionClassNames = `
  flex
  flex-col
  items-center
  justify-center
  space-y-4
  w-full
`;

const BlanketErrorSection = styled.section.attrs({
  className: `
    ${SharedSectionClassNames}
    h-full
  `,
})``;

const Section = styled.section.attrs({
  className: SharedSectionClassNames,
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
      <BlanketErrorSection>
        <BlanketErrorMessage>Please connect wallet</BlanketErrorMessage>
      </BlanketErrorSection>
    );
  }
  if (!SUPPORTED_CHAIN_IDS.includes(chain.id)) {
    return (
      <BlanketErrorSection>
        <BlanketErrorMessage>Oops! Unsupported Network</BlanketErrorMessage>
      </BlanketErrorSection>
    );
  }
  if (isSelectingMarket) {
    return (
      <Section>
        <PageHeaderTitle>Create New Pozition</PageHeaderTitle>
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
      <PageHeaderTitle>Create New Pozition</PageHeaderTitle>
      <NewPozitionForm
        market={selectedMarket}
        synthRates={synthRates}
        onSwitch={handleOnSwitch}
      />
    </Section>
  );
};
