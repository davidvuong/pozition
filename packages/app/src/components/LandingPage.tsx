import styled from "styled-components";
import { times, sample } from "lodash";
import HeroLandscape from "../images/hero-landscape.png";
import { PrimaryButton } from "./Button";
import { ArrowRightSvg } from "./images/ArrowRightSvg";

const TitleText = styled.span.attrs({
  className: `
    mx-4

    font-semibold
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-gray-500
    to-gray-50

    text-9xl
    uppercase
  `,
})``;

const Title = ({ text, n }: { text: string; n: number }) => (
  <div className="py-2 animate-marquee whitespace-nowrap">
    {times(n ?? 5).map(() => (
      <TitleText>{text}</TitleText>
    ))}
  </div>
);

export const LandingPage = () => {
  const handleExplore = () => {
    console.log("hello world!");
  };

  return (
    <div className="w-full">
      <section className="bg-zinc-900">
        <div className="ml-20 overflow-x-hidden absolute mt-20 w-3/5">
          <div className="py-12 animate-marquee whitespace-nowrap">
            <span className="mx-4 text-stone-300 text-9xl"></span>
            <Title text="transferrable" n={5} />
            <Title text="future" n={10} />
            <Title text="pozitions" n={10} />
          </div>
          <PrimaryButton onClick={handleExplore}>
            <span className="uppercase">Explore &nbsp;</span>
            <ArrowRightSvg />
          </PrimaryButton>
        </div>
        <img
          className="w-full pointer-events-none opacity-30"
          src={HeroLandscape}
        />
      </section>
    </div>
  );
};
