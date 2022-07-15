import { useState } from "react";
import { DEFAULT_MARKET, TV_TRADING_PAIR } from "../constants/markets";
import * as TV from "react-tradingview-components";

export const CreatePozitionPage = () => {
  const [tradingPair, setTradingPair] = useState(
    TV_TRADING_PAIR[DEFAULT_MARKET]
  );

  return (
    <section>
      <div className="flex flex-col items-center justify-center space-x-8 sm:flex-row sm:mt-32">
        <TV.TradingViewStockChartWidget
          symbol={tradingPair}
          theme="Dark"
          range="12m"
        />

        <div className="">
          <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10"></div>
        </div>
      </div>
    </section>
  );
};
