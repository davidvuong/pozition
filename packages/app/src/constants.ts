import { ContractInterface } from "ethers";
import { chain } from "wagmi";
import SynthUtilOptimismAbi from "./abis/SynthUtilOptimism.json";
import SynthUtilOptimismKovanAbi from "./abis/SynthUtilOptimismKovan.json";

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

export const MARKET_TO_NAME: Record<Market, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  LINK: "Chainlink",
  AAVE: "Aave",
  APE: "ApeCoin",
  AVAX: "Avalanche",
  DYDX: "dYdX",
  MATIC: "Polygon",
  SOL: "Solana",
  UNI: "Uniswap",
};

export const DEFAULT_MARKET = Market.ETH;

export const SUPPORTED_CHAINS = [chain.optimismKovan, chain.optimism];
export const SUPPORTED_CHAIN_IDS = SUPPORTED_CHAINS.map(({ id }) => id);

export const CHAIN_ADDRESSES: Record<number, Record<string, string>> = {
  // Optimism Mainnet
  10: {
    SUSD: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    SYNTH_UTIL: "0x87b1481c82913301Fc6c884Ac266a7c430F92cFA",
  },

  // Optimism Kovan
  69: {
    SUSD: "0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57",
    SYNTH_UTIL: "0x5DF689ea1FB350bcB177Ff5e66ED8Dfe28C6045D",
  },
};

export const CHAIN_ABIS: Record<number, Record<string, ContractInterface>> = {
  // Optimism Mainnet
  10: {
    SYNTH_UTIL_ABI: SynthUtilOptimismAbi,
  },

  // Optimism Kovan
  69: {
    SYNTH_UTIL_ABI: SynthUtilOptimismKovanAbi,
  },
};
