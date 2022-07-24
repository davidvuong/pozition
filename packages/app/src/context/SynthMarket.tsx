import { useState, memo, useEffect } from "react";
import React from "react";
import { BigNumber, ethers } from "ethers";
import { useSynthetixContracts } from "../hooks/useSynthetixContracts";

export const SYNTH_REFRESH_INTERVAL = 5000;

export interface SynthMarketValues {
  timer?: NodeJS.Timeout;
  isFetching: boolean;
  synths: Record<string, BigNumber>;
  refreshSynths: () => Promise<void>;
}

const iniitalSynthMarketValues: SynthMarketValues = {
  isFetching: false,
  synths: {} as Record<number, BigNumber>,
  refreshSynths: () => Promise.resolve(),
};

export const SynthMarketContext = React.createContext<SynthMarketValues>(
  iniitalSynthMarketValues
);

export const SynthMarketContextProvider = memo(
  ({ children }: { children: React.ReactNode }) => {
    const { SynthUtil } = useSynthetixContracts();

    const fetchSynths = async () => {
      if (SynthUtil) {
        const [tokens, rates] = await SynthUtil.synthsRates();
        return tokens.reduce(
          (acc: Record<string, BigNumber>, token: string, idx: number) => {
            acc[ethers.utils.parseBytes32String(token)] = rates[idx];
            return acc;
          },
          {} as Record<string, BigNumber>
        );
      }
      return {};
    };

    const refreshSynths = async () => {
      setState((prevState) => ({ ...prevState, isFetching: true }));
      try {
        const synths = await fetchSynths();
        setState((prevState) => ({ ...prevState, synths, isFetching: false }));
      } catch (err) {
        setState((prevState) => ({ ...prevState, isFetching: false }));
        throw err;
      }
    };

    // Similar to TransactionNotification, this is a horrible mess.
    const [state, setState] = useState<SynthMarketValues>({
      ...iniitalSynthMarketValues,
      refreshSynths,
    });

    useEffect(() => {
      if (!state.timer) {
        refreshSynths();
        const timer = setInterval(
          () => refreshSynths(),
          SYNTH_REFRESH_INTERVAL
        );
        setState((prevState) => ({ ...prevState, timer }));
      }

      return () => {
        state.timer ? clearInterval(state.timer) : undefined;
        state.timer = undefined;
      };
    }, []);

    return (
      <SynthMarketContext.Provider value={state}>
        {children}
      </SynthMarketContext.Provider>
    );
  }
);
