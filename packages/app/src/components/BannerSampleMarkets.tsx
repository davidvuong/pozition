// TODO: Fetch real prices from Coingecko.
const markets = [
  {
    ticker: "sBTC",
    name: "Bitcoin",
    price: "$29,498.94",
    icon: "/tokens/btc.webp",
  },
  {
    ticker: "sETH",
    name: "Ethereum",
    price: "$1051.11",
    icon: "/tokens/eth.webp",
  },
  {
    ticker: "sLINK",
    name: "Chainlink",
    price: "$6.62",
    icon: "/tokens/link.webp",
  },
  {
    ticker: "AVAX",
    name: "Avalanche",
    price: "$17.78",
    icon: "/tokens/avax.webp",
  },
  {
    ticker: "MATIC",
    name: "Polygon",
    price: "$0.58",
    icon: "/tokens/matic.webp",
  },
  {
    ticker: "sUNI",
    name: "Uniswap",
    price: "$5.74",
    icon: "/tokens/uni.webp",
  },
];

interface MarketProps {
  ticker: string;
  name: string;
  price: string;
  icon: string;
}

const Market = (props: MarketProps) => (
  <div className="py-14 px-20 bg-graph-paper hover:bg-black-700 flex space-x-8 rounded-2xl border-4 border-gray-300/90">
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
  const duplicatesMarkets = markets.concat(markets);
  return (
    <section className="flex overflow-x-hidden whitespace-nowrap bg-black-800 py-16 md:py-24">
      <div className="relative">
        <div className="flex space-x-8 animate-marquee">
          {duplicatesMarkets.map((market, i) => (
            <Market {...market} key={i} />
          ))}
        </div>
        <div className="flex space-x-8 absolute top-0 animate-marquee2">
          {duplicatesMarkets.map((market, i) => (
            <Market {...market} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
