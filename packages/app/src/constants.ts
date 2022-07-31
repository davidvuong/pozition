import { ContractInterface } from "ethers";
import { Chain, chain } from "wagmi";
import SynthUtilOptimismAbi from "./abis/SynthUtilOptimism.json";
import SynthUtilOptimismKovanAbi from "./abis/SynthUtilOptimismKovan.json";
import ProxyERC20SUSDOptimismAbi from "./abis/ProxyERC20SUSDOptimism.json";
import ProxyERC20SUSDOptimismKovanAbi from "./abis/ProxyERC20SUSDOptimismKovan.json";
import FuturesMarketOptimismKovanAbi from "./abis/FuturesMarketOptimismKovan.json";
import FuturesMarketOptimismAbi from "./abis/FuturesMarketOptimism.json";

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

export const MARKET_TO_CONTRACTS: Record<Market, string> = {
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

export const DEFAULT_CHAIN = 69;

export const CHAIN_ADDRESSES: Record<number, Record<string, string>> = {
  // Optimism Mainnet
  10: {
    SUSD: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    SYNTH_UTIL: "0x87b1481c82913301Fc6c884Ac266a7c430F92cFA",
    POZITION_MANAGER: "",
  },

  // Optimism Kovan
  69: {
    SUSD: "0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57",
    SYNTH_UTIL: "0x5DF689ea1FB350bcB177Ff5e66ED8Dfe28C6045D",
    POZITION_MANAGER: "0xAffDc7730459848B844BB17a3e23eDe3d8f348a2",
  },
};

export const CHAIN_ABIS: Record<number, Record<string, ContractInterface>> = {
  // Optimism Mainnet
  10: {
    SYNTH_UTIL_ABI: SynthUtilOptimismAbi,
    SUSD_ABI: ProxyERC20SUSDOptimismAbi,
    FUTURES_MARKET_ABI: FuturesMarketOptimismAbi,
  },

  // Optimism Kovan
  69: {
    SYNTH_UTIL_ABI: SynthUtilOptimismKovanAbi,
    SUSD_ABI: ProxyERC20SUSDOptimismKovanAbi,
    FUTURES_MARKET_ABI: FuturesMarketOptimismKovanAbi,
  },
};

export const CHAIN_ETHERSCAN_URIS: Record<number, string> = {
  10: "https://optimistic.etherscan.io/",
  69: "https://kovan-optimistic.etherscan.io/",
};

export const getDefaultChainId = (chain?: Chain): number =>
  !chain ? DEFAULT_CHAIN : SUPPORTED_CHAIN_IDS[chain.id] ?? DEFAULT_CHAIN;

export const DEFAULT_TOKEN_ID = 1;
