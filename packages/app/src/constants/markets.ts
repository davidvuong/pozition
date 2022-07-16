export enum Market {
  ETH = "ETH",
  BTC = "BTC",
  LINK = "LINK",
  AAVE = "AAVE",
  APE = "APE",
  AVAX = "AVAX",
  DYDX = "DYDX",
  MATIC = "MATIC",
  SOL = "SOL",
  UNI = "UNI",
}

export const SUPPORTED_MARKET_CONTRACTS: Record<Market, string> = {
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

export const MARKET_LABELS: Record<Market, string> = Object.values(
  Market
).reduce((acc, market) => {
  acc[market] = `s${market}/sUSD`;
  return acc;
}, {} as Record<Market, string>);

// Eventually replace custom chart using CL Oracles. For now, good ol' Binance.
export const MARKET_TV_TRADING_PAIR: Record<Market, string> = {
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

export const MARKET_LOGO_PATH: Record<Market, string> = Object.values(
  Market
).reduce((acc, market) => {
  acc[market] = `/tokens/${market.toLowerCase()}.webp`;
  return acc;
}, {} as Record<Market, string>);

export const DEFAULT_MARKET = Market.ETH;
