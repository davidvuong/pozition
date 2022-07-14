import styled from "styled-components";
import { PrimaryButton } from "../components/Button";
import HeroLandscape from "../images/hero-landscape.png";
import { BannerBetterWayToTrade } from "../components/BannerBetterWayToTrade";
import { BannerSampleMarkets } from "../components/BannerSampleMarkets";
import { ArrowRightSvg } from "../components/images/ArrowRightSvg";

const PagePreTitle = styled.h4.attrs({
  className: `
    font-semibold
    uppercase
    tracking-tight

    text-center
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-gray-500
    to-red-800

    lg:text-left
  `,
})``;

const PageTitle = styled.h1.attrs({
  className: `
    hidden

    text-4xl
    text-gray-900
    tracking-tight
    font-extrabold

    sm:block
    sm:text-5xl
    md:text-6xl
    lg:text-5xl
    xl:text-6xl
  `,
})``;

const PageSubtitle = styled.p.attrs({
  className: `
    mt-3
    max-w-md
    mx-auto
    text-gray-200
    text-base
    font-semmibold
    uppercase

    md:mt-5
    md:max-w-3xl
  `,
})``;

const Emph = styled.span.attrs({
  className: `
    text-gray-400
    font-bold
  `,
})``;

export const LandingPage = () => {
  return (
    <div className="relative">
      <section className="py-16 relative bg-black">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-3/5 sm:px-8 xl:pr-16">
            <PagePreTitle>1 Pozition = 1 NFT</PagePreTitle>
            <PageTitle>
              <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-gray-400 to-gray-100 uppercase xl:inline">
                Add transferability to your
              </span>{" "}
              <span className="block text-gray-400 font-misto xl:inline">
                Pozitions
              </span>
            </PageTitle>
            <PageSubtitle>
              Be <Emph>free</Emph> from{" "}
              <span className="text-red-500 line-through">restrictions.</span>{" "}
              Trade your <Emph> Synthetix</Emph> futures like you would any
              other ERC721 NFT.
            </PageSubtitle>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md">
                <PrimaryButton>
                  <span className="uppercase">launch app &nbsp;</span>
                  <ArrowRightSvg />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-64 bg-red sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/5 lg:h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
            src={HeroLandscape}
          />
        </div>
      </section>
      <BannerSampleMarkets />
      <BannerBetterWayToTrade />
    </div>
  );
};
