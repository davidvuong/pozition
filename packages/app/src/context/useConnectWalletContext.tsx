import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import WalletConnect from '@walletconnect/client';
import { providers } from 'ethers';

interface WalletConnectContextType {
  connector: WalletConnect | null;
  setConnector: Dispatch<SetStateAction<WalletConnect | null>>;
  provider: {
    10: providers.JsonRpcProvider | null;
    69: providers.JsonRpcProvider | null;
  };
  chainId: null | number;
  setChainId: Dispatch<SetStateAction<number | null>> | null;
}

const WalletConnectContext = createContext<WalletConnectContextType>({
  connector: null,
  setConnector: () => null,
  provider: { 10: null, 69: null },
  chainId: null,
  setChainId: () => null,
});

export const useConnectWallet = () => useContext(WalletConnectContext);

export function ConnectWalletProvider({ children }: PropsWithChildren<{}>) {
  const [connector, setConnector] = useState<null | WalletConnect>(null);
  const provider = {
    10: new providers.JsonRpcProvider('https://mainnet.optimism.io'),
    69: new providers.JsonRpcProvider('https://kovan.optimism.io'),
  };
  const [chainId, setChainId] = useState<null | number>(null);
  useEffect(() => {
    if (connector) {
      if (!connector.connected) {
        connector.createSession();
      }
      connector.on('session_update', (error, payload) => {
        if (error) {
          throw error;
        }

        const { chainId } = payload.params[0];
        setChainId(chainId);
      });
      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }

        const { accounts, chainId } = payload.params[0];
        setChainId(chainId);
      });
      setChainId(connector.chainId);
    }
  }, [connector]);
  return (
    <WalletConnectContext.Provider
      value={{ connector, setConnector, provider, chainId, setChainId }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
}
