import styled from "styled-components";
import { times } from "lodash";
import { useNavigate } from "react-router-dom";
import HeroLandscape from "../images/hero-landscape.png";
import { PrimaryButton } from "./Button";
import { ArrowRightSvg } from "./images/ArrowRightSvg";

const FunkyTitleText = styled.span.attrs({
  className: `
    md:mx-2
    lg:mx-6

    font-semibold
    font-misto
    text-transparent
    text-3xl
    uppercase
    to-gray-50
    bg-clip-text
    bg-gradient-to-r
    from-gray-500

    lg:text-7xl
    xl:text-9xl
  `,
})``;

interface AnimatedTitleProps {
  children?: React.ReactNode;
  n?: number;
}

const AnimatedTitle = (props: AnimatedTitleProps) => (
  <div className="py-4 animate-marquee whitespace-nowrap">
    {times(props.n ?? 32).map(() => (
      <FunkyTitleText>{props.children}</FunkyTitleText>
    ))}
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const handleExplore = () => navigate("/new");

  return (
    <section className="bg-zinc-900">
      <div className="ml-8 lg:ml-20 overflow-x-hidden w-3/5 absolute">
        <div className="py-6 lg:py-12 animate-marquee whitespace-nowrap">
          <span className="mx-4 text-stone-300 lg:text-9xl"></span>
          <AnimatedTitle>transferrable</AnimatedTitle>
          <AnimatedTitle>future</AnimatedTitle>
          <AnimatedTitle>pozitions</AnimatedTitle>
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
  );
};
