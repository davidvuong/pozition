import { PrimaryButton } from "../components/Button";
import HeroLandscape from "../images/hero-landscape.png";
import { AnimatedPozitionSection } from "./AnimatedPozitionSection";
import { BetterWayToTradeBanner } from "./BetterWayToTradeBanner";
import { SampleMarketsBanner } from "./SampleMarketsBanner";
import { ArrowRightSvg } from "./images/ArrowRightSvg";

export const LandingPageV2 = () => {
  return (
    <div className="relative">
      <section className="relative bg-black">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-3/5 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-gray-400
                  to-gray-100
                  uppercase
                  xl:inline"
              >
                Add transferability to your
              </span>{" "}
              <span className="block text-gray-500 font-misto xl:inline">
                pozitions.
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-gray-200 md:mt-5 md:max-w-3xl uppercase font-semibold text-base">
              Be <span className="text-gray-400">free</span> from{" "}
              <span className="text-red-500 line-through">restrictions.</span>{" "}
              Trade your <span className="text-gray-400"> Synthetix</span> perps{" "}
              <span className="font-misto">pozitions</span> like you would any
              other ERC721 NFT. Do it now.{" "}
              <span className="text-gray-400">Launch it.</span>
            </p>
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
      <SampleMarketsBanner />
      <BetterWayToTradeBanner />
      <AnimatedPozitionSection />
    </div>
  );
};
