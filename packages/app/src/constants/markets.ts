import GenericPosition from "../images/pozitions/GENERIC.svg";
import BtcLongBig from "../images/pozitions/BTC-LONG-BIG.svg";
import BtcLongSmall from "../images/pozitions/BTC-LONG-SMALL.svg";
import BtcShortBig from "../images/pozitions/BTC-SHORT-BIG.svg";
import BtcShortSmall from "../images/pozitions/BTC-SHORT-SMALL.svg";
import EthLongBig from "../images/pozitions/ETH-LONG-BIG.svg";
import EthLongSmall from "../images/pozitions/ETH-LONG-SMALL.svg";
import EthShortBig from "../images/pozitions/ETH-SHORT-BIG.svg";
import EthShortSmall from "../images/pozitions/ETH-SHORT-SMALL.svg";
import LinkLongBig from "../images/pozitions/LINK-LONG-BIG.svg";
import LinkLongSmall from "../images/pozitions/LINK-LONG-SMALL.svg";
import LinkShortBig from "../images/pozitions/LINK-SHORT-BIG.svg";
import LinkShortSmall from "../images/pozitions/LINK-SHORT-SMALL.svg";

export enum Market {
  BTC = "BTC",
  ETH = "ETH",
  LINK = "LINK",
  AAVE = "AAVE",
  APE = "APE",
  AVAX = "AVAX",
  DYDX = "DYDX",
  MATIC = "MATIC",
  SOL = "SOL",
  UNI = "UNI",
}

export enum MarketPositionSize {
  BIG = "BIG",
  SMALL = "SMALL",
}

export enum MarketPositionSide {
  LONG = "LONG",
  SHORT = "SHORT",
}

export const SUPPORTED_MARKETS: Record<Market, string> = {
  BTC: "FuturesMarketBTC",
  ETH: "FuturesMarketETH",
  LINK: "FuturesMarketLINK",
  AAVE: "FuturesMarketAAVE",
  APE: "FuturesMarketAPE",
  AVAX: "FuturesMarketAVAX",
  DYDX: "FuturesMarketDYDX",
  MATIC: "FuturesMarketMATIC",
  SOL: "FuturesMarketSOL",
  UNI: "FuturesMarketUNI",
};

// Eventually replace custom chart using CL Oracles. For now, good ol' Binance.
export const TV_TRADING_PAIR: Record<Market, string> = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
  LINK: "BINANCE:LINKUSDT",
  AAVE: "BINANCE:AAVEUSDT",
  APE: "BINANCE:APEUSDT",
  AVAX: "BINANCE:AVAXUSDT",
  DYDX: "BINANCE:AVAXUSDT",
  MATIC: "BINANCE:MATICUSDT",
  SOL: "BINANCE:SOLUSDT",
  UNI: "BINANCE:UNIUSDT",
};

export const DEFAULT_MARKET = Market.ETH;

export const getMarketSvg = async (
  market: Market,
  size: MarketPositionSize,
  side: MarketPositionSide,
  address: string,
  price: string
): Promise<string> => {
  const pMarket = [Market.BTC, Market.ETH, Market.LINK].includes(market)
    ? `${market}-${side}-${size}`
    : "GENERIC";

  // @see: https://github.com/webpack/webpack/issues/6680
  const path = `../images/pozitions/${pMarket}.svg`;

  return GenericPosition.replace("{PLACEHOLDER_ADDRESS}", address)
    .replace("{PLACEHOLDER_PRICE}", price)
    .replace("{PLACEHOLDER_SIZE}", size);
};

// export enum Market {
//   BTC = "BTC",
//   ETH = "ETH",
//   LINK = "LINK",
//   AAVE = "AAVE",
//   APE = "APE",
//   AVAX = "AVAX",
//   DYDX = "DYDX",
//   MATIC = "MATIC",
//   SOL = "SOL",
//   UNI = "UNI",
// }

// export enum MarketPositionSize {
//   BIG = "BIG",
//   SMALL = "SMALL",
// }

// export enum MarketPositionSide {
//   LONG = "LONG",
//   SHORT = "SHORT",
// }

// export const SUPPORTED_MARKETS: Record<Market, string> = {
//   BTC: "FuturesMarketBTC",
//   ETH: "FuturesMarketETH",
//   LINK: "FuturesMarketLINK",
//   AAVE: "FuturesMarketAAVE",
//   APE: "FuturesMarketAPE",
//   AVAX: "FuturesMarketAVAX",
//   DYDX: "FuturesMarketDYDX",
//   MATIC: "FuturesMarketMATIC",
//   SOL: "FuturesMarketSOL",
//   UNI: "FuturesMarketUNI",
// };

// // Eventually replace custom chart using CL Oracles. For now, good ol' Binance.
// export const TV_TRADING_PAIR: Record<Market, string> = {
//   BTC: "BINANCE:BTCUSDT",
//   ETH: "BINANCE:ETHUSDT",
//   LINK: "BINANCE:LINKUSDT",
//   AAVE: "BINANCE:AAVEUSDT",
//   APE: "BINANCE:APEUSDT",
//   AVAX: "BINANCE:AVAXUSDT",
//   DYDX: "BINANCE:AVAXUSDT",
//   MATIC: "BINANCE:MATICUSDT",
//   SOL: "BINANCE:SOLUSDT",
//   UNI: "BINANCE:UNIUSDT",
// };

// export const DEFAULT_MARKET = Market.ETH;

// export const getMarketSvg = (
//   market: Market,
//   size: MarketPositionSize,
//   side: MarketPositionSide,
//   address: string,
//   price: string
// ): string => {
//   return require("../images/pozitions/GENERIC.svg").default;

//   // const MARKET_SVG_MAP = {
//   //   BTC: {
//   //     [MarketPositionSide.LONG]: {
//   //       [MarketPositionSize.BIG]: BtcLongBig,
//   //       [MarketPositionSize.SMALL]: BtcLongSmall,
//   //     },
//   //     [MarketPositionSide.SHORT]: {
//   //       [MarketPositionSize.BIG]: BtcShortBig,
//   //       [MarketPositionSize.SMALL]: BtcShortSmall,
//   //     },
//   //   },
//   //   ETH: {
//   //     [MarketPositionSide.LONG]: {
//   //       [MarketPositionSize.BIG]: EthLongBig,
//   //       [MarketPositionSize.SMALL]: EthLongSmall,
//   //     },
//   //     [MarketPositionSide.SHORT]: {
//   //       [MarketPositionSize.BIG]: EthShortBig,
//   //       [MarketPositionSize.SMALL]: EthShortSmall,
//   //     },
//   //   },
//   //   LINK: {
//   //     [MarketPositionSide.LONG]: {
//   //       [MarketPositionSize.BIG]: LinkLongBig,
//   //       [MarketPositionSize.SMALL]: LinkLongSmall,
//   //     },
//   //     [MarketPositionSide.SHORT]: {
//   //       [MarketPositionSize.BIG]: LinkShortBig,
//   //       [MarketPositionSize.SMALL]: LinkShortSmall,
//   //     },
//   //   },
//   // };

//   // const svg = (MARKET_SVG_MAP as any)[market]?[side]?[size] ?? GenericPosition;
//   // return svg
//   //   .replace("{PLACEHOLDER_ADDRESS}", address)
//   //   .replace("{PLACEHOLDER_PRICE}", price)
//   //   .replace("{PLACEHOLDER_SIZE}", size);
// };
