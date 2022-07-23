import { BigNumber } from "ethers";
import { useState } from "react";
import styled from "styled-components";
import { useAccount, useNetwork } from "wagmi";
import { PageHeaderTitle } from "../components/PageHeaderTitle";
import { usePozitionContracts } from "../hooks/usePozitionContracts";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";

const Section = styled.section.attrs({
  className: `
    flex
    flex-col
    items-center
    justify-center
    w-full
  `,
})``;

export const HodlPage = () => {
  const [synthRates, setSynthRates] = useState<Record<string, BigNumber>>({});
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { SynthUtil } = useSynthetixContracts();
  const { PozitionManagerContract } = usePozitionContracts();

  return (
    <Section>
      <PageHeaderTitle>Your Pozitions</PageHeaderTitle>
    </Section>
  );
};
