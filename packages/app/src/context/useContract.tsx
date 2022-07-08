import { Contract } from 'ethers';
import { createContext, PropsWithChildren, useContext } from 'react';
import erc20 from '../abis//ERC20.json';
import abi from '../abis/FuturesNFTPosition.json';
import abiFactory from '../abis/FuturesNFTPositionFactory.json';
import abiManager from '../abis/FuturesPositionsManager.json';

interface Contracts {
  69: {
    FuturesPositionContract: Contract | null;
    FuturesPositionFactory: Contract | null;
    FuturesPositionManager: Contract | null;
    sUSD: Contract | null;
  };
  10: {
    FuturesPositionContract: Contract | null;
    FuturesPositionFactory: Contract | null;
    FuturesPositionManager: Contract | null;
    sUSD: Contract | null;
  };
}

const ContractContext = createContext<Contracts>({
  69: {
    FuturesPositionContract: null,
    FuturesPositionFactory: null,
    FuturesPositionManager: null,
    sUSD: null,
  },
  10: {
    FuturesPositionContract: null,
    FuturesPositionFactory: null,
    FuturesPositionManager: null,
    sUSD: null,
  },
});

export const useContract = () => useContext(ContractContext);

export function ContractProvider({ children }: PropsWithChildren<{}>) {
  return (
    <ContractContext.Provider
      value={{
        69: {
          FuturesPositionContract: new Contract(
            '0xcE156F8eEAA95bB7B172779aC1d6492Ba5B58fB1',
            abi
          ),
          FuturesPositionFactory: new Contract(
            '0xDFE0b78aBa2321fB8f7dbc8950831693aA791138',
            abiFactory
          ),
          FuturesPositionManager: new Contract(
            '0x3A38D3012C8E30AE9F1daf9dC44BAB0fd3c6d37B',
            abiManager
          ),
          sUSD: new Contract(
            '0xaA5068dC2B3AADE533d3e52C6eeaadC6a8154c57',
            erc20
          ),
        },
        10: {
          FuturesPositionContract: new Contract(
            '0x9d157324BC8f4Feb6203423d7FCb664e6AAF725c',
            abi
          ),
          FuturesPositionFactory: new Contract(
            '0x67E735966b69AC84aa9F58b66d847abF743D48A8',
            abiFactory
          ),
          FuturesPositionManager: new Contract(
            '0xf2B3bA6fC3D3de34DC022Bb565EA00ef3a7d45f5',
            abiManager
          ),
          sUSD: new Contract(
            '0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9',
            erc20
          ),
        },
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}
