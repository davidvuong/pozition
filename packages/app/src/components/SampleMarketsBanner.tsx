/* This example requires Tailwind CSS v2.0+ */
import styled from "styled-components";
import Bitcoin from "../images/tokens/btc.png";
import Link from "../images/tokens/link.png";
import Ethereum from "../images/tokens/eth.png";

const markets = [
  {
    ticker: "sBTC",
    name: "Bitcoin",
    price: "$29,498.94",
    icon: Bitcoin,
  },
  {
    ticker: "sETH",
    name: "Ethereum",
    price: "$1051.11",
    icon: Ethereum,
  },
  {
    ticker: "sLINK",
    name: "Chainlink",
    price: "$6.62",
    icon: Link,
  },
];

export const SampleMarketsBanner = () => {
  return (
    <section className="bg-black flex py-16 md:py-24 justify-items-center justify-center space-x-8">
      {markets.map((market, i) => (
        <div className="py-20 px-32 bg-graph-paper flex space-x-8 rounded-2xl border-4 border-gray-300/90">
          <div className="flex flex-col space-y-2" key={i}>
            <div className="flex flex-row space-x-2">
              <img src={market.icon} draggable="false" />
              <span className="text-gray-200 text-2xl font-semibold">
                {market.ticker} / <span className="text-xl">sUSD</span>
              </span>
            </div>
            <span className="text-gray-400 font-semibold uppercase">
              {market.name}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-gray-200 text-2xl font-semibold uppercase">
              {market.price}
            </span>
            <span className="text-gray-400 font-semibold uppercase">Price</span>
          </div>
        </div>
      ))}
    </section>
  );
};
