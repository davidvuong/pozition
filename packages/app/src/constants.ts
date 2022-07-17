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

export const MARKET_LOGO_PATH: Record<Market, string> = Object.values(
  Market
).reduce((acc, market) => {
  acc[market] = `/tokens/${market.toLowerCase()}.webp`;
  return acc;
}, {} as Record<Market, string>);

export const DEFAULT_MARKET = Market.ETH;

export const ADDRESSES: Record<number, Record<string, string>> = {
  10: {
    SUSD: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
  },

  // Optimism Kovan
  69: {
    SUSD: "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51",
  },
};
