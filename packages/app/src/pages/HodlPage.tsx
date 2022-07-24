import styled from "styled-components";
import { useAccount, useNetwork } from "wagmi";
import { MyPozitionsTable } from "../components/MyPozitionsTable";
import { PageHeaderTitle } from "../components/PageHeaderTitle";
import { SUPPORTED_CHAIN_IDS } from "../constants";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";

const SharedSectionClassNames = `
  flex
  flex-col
  items-center
  justify-center
`;

const BlanketErrorSection = styled.section.attrs({
  className: `
    ${SharedSectionClassNames}
    w-full
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

export const HodlPage = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { SynthUtil } = useSynthetixContracts();

  // TODO: Same set of checks are performed in CreatePozitionPage. Surely this can be refactored.
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

  return (
    <Section>
      <PageHeaderTitle>Your Pozitions</PageHeaderTitle>
      <MyPozitionsTable />
    </Section>
  );
};
