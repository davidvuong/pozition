import btc from "../images/tokens/btc.webp";
import link from "../images/tokens/link.webp";
import eth from "../images/tokens/eth.webp";
import matic from "../images/tokens/matic.webp";
import uni from "../images/tokens/uni.webp";
import avax from "../images/tokens/avax.webp";

// TODO: Fetch real prices from Coingecko.
const markets = [
  {
    ticker: "sBTC",
    name: "Bitcoin",
    price: "$29,498.94",
    icon: btc,
  },
  {
    ticker: "sETH",
    name: "Ethereum",
    price: "$1051.11",
    icon: eth,
  },
  {
    ticker: "sLINK",
    name: "Chainlink",
    price: "$6.62",
    icon: link,
  },
  {
    ticker: "AVAX",
    name: "Avalanche",
    price: "$17.78",
    icon: avax,
  },
  {
    ticker: "MATIC",
    name: "Polygon",
    price: "$0.58",
    icon: matic,
  },
  {
    ticker: "sUNI",
    name: "Uniswap",
    price: "$5.74",
    icon: uni,
  },
];

interface MarketProps {
  ticker: string;
  name: string;
  price: string;
  icon: string;
}

const Market = (props: MarketProps) => (
  <div className="py-20 px-20 bg-graph-paper flex space-x-8 rounded-2xl border-4 border-gray-300/90">
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row space-x-2 mr-4">
        <img src={props.icon} width="32" height="32" draggable="false" />
        <span className="text-gray-200 text-2xl font-semibold">
          {props.ticker} / <span className="text-gray-300">sUSD</span>
        </span>
      </div>
      <span className="text-gray-400 font-semibold uppercase">
        {props.name}
      </span>
    </div>
    <div className="flex flex-col space-y-2">
      <span className="text-gray-200 text-2xl font-semibold uppercase">
        {props.price}
      </span>
      <span className="text-gray-400 font-semibold uppercase">Price</span>
    </div>
  </div>
);

export const BannerSampleMarkets = () => {
  return (
    <section className="bg-black flex py-16 md:py-24 justify-items-center justify-center space-x-8 animate-marquee whitespace-nowrap">
      {markets.concat(markets).map((market, i) => (
        <Market {...market} key={i} />
      ))}
      {markets.concat(markets).map((market, i) => (
        <Market {...market} key={i} />
      ))}
    </section>
  );
};
