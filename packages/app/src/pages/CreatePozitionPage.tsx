import styled from "styled-components";
import { useAccount, useNetwork } from "wagmi";
import { DEFAULT_MARKET, SUPPORTED_CHAIN_IDS, Market } from "../constants";
import { useState } from "react";
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
  const [selectedMarket, setSelectedMarket] = useState<Market>(DEFAULT_MARKET);
  const [isSelectingMarket, setIsSelectingMarket] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const handleOnSwitch = () => setIsSelectingMarket(!isSelectingMarket);

  if (!isConnected || !chain?.id) {
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
          onSelect={setSelectedMarket}
          onSwitch={handleOnSwitch}
        />
      </Section>
    );
  }
  return (
    <Section>
      <PageHeaderTitle>Create New Pozition</PageHeaderTitle>
      <NewPozitionForm market={selectedMarket} onSwitch={handleOnSwitch} />
    </Section>
  );
};
