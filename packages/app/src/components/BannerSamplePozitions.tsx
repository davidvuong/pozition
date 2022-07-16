// import { times, sample, random } from "lodash";
import { useEffect, useState } from "react";
// import styled from "styled-components";
// import {
//   getMarketSvg,
//   Market,
//   MarketPositionSide,
//   MarketPositionSize,
// } from "../constants/markets";

// const PageTitle = styled.h1.attrs({
//   className: `
//     text-3xl
//     text-gray-300
//     font-extrabold
//     uppercase
//     sm:text-4xl
//   `,
// })``;

// const genAddress = () =>
//   "0x" +
//   times(40)
//     .map(() => Math.floor(Math.random() * 16).toString(16))
//     .join("");
// const genMarket = () => sample(Object.values(Market))!;
// const genSize = () => sample(Object.values(MarketPositionSize))!;
// const genSide = () => sample(Object.values(MarketPositionSide))!;
// const genPrice = (market: Market) => {
//   switch (market) {
//     case Market.AAVE:
//       return random(60, 90, true);
//     case Market.APE:
//       return random(4, 27, true);
//     case Market.AVAX:
//       return random(15, 140, true);
//     case Market.BTC:
//       return random(10_000, 69_000, true);
//     case Market.DYDX:
//       return random(0.95, 30, true);
//     case Market.ETH:
//       return random(400, 4900, true);
//     case Market.LINK:
//       return random(5, 50, true);
//     case Market.MATIC:
//       return random(0.01, 3, true);
//     case Market.SOL:
//       return random(35, 260, true);
//     case Market.UNI:
//       return random(2, 45, true);
//     default:
//       return Math.random();
//   }
// };

// interface SamplePozition {
//   address: string;
//   market: Market;
//   size: MarketPositionSize;
//   side: MarketPositionSide;
//   price: string;
//   image: string;
// }

// const genPozitions = (n: number): Promise<SamplePozition[]> =>
//   Promise.all(
//     times(n).map(async () => {
//       const address = genAddress();
//       const market = genMarket();
//       const size = genSize();
//       const side = genSide();
//       const price = genPrice(market).toFixed(2);
//       const image = await getMarketSvg(market, size, side, address, price);

//       return { address, market, size, side, price, image };
//     })
//   );

export const BannerSamplePozitions = () => {
  // const [pozitions, setPozitions] = useState<SamplePozition[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     setPozitions(await genPozitions(12));
  //   })();
  // }, []);

  return (
    <section className="relative mx-auto bg-black-800 py-16 sm:py-32">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <PageTitle>
            Community{" "}
            <span className="text-gray-400 font-misto">Pozitions</span>
          </PageTitle>
        </div>
      </div>
      <div className="flex mt-12 max-w-lg mx-auto grid gap-6 lg:grid-cols-4 lg:max-w-7xl">
        {pozitions.map((pozition, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex-shrink-0 h-48">
              <img className="h-48 w-full object-cover" src={pozition.image} />
            </div>
            <div className="flex-1 bg-black-700 bg-graph-paper p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="mt-3 text-sm text-semibold uppercase text-gray-300">
                  {pozition.side}; {pozition.market}/sUSD; ${pozition.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
};
