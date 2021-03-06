import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { App } from "./App";

const { chains, provider } = configureChains(
  [chain.optimismKovan, chain.optimism],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Pozition",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
);
