import { useState } from "react";
import * as TV from "react-tradingview-components";

export const CreatePozitionPage = () => {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");

  return (
    <section>
      <button
        className="bg-red-900"
        onClick={() => setSymbol("BINANCE:ETHUSDT")}
      >
        Click me
      </button>
      <TV.TradingViewStockChartWidget
        symbol={symbol}
        theme="Dark"
        range="12m"
      />
    </section>
  );
};
