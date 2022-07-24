import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { BigNumber } from "ethers";
import { Market, MARKET_TO_NAME } from "../constants";
import { prettyFormatBigNumber } from "../utils";
import { SelectedMarketHeader } from "./SelectedMarketHeader";

export interface SelectMarketRadioGroupProps {
  selected: Market;
  synthRates: Record<string, BigNumber>;
  onSelect: (market: Market) => void;
  onSwitch: () => void;
}

export const SelectMarketRadioGroup = ({
  selected,
  synthRates,
  onSelect,
  onSwitch,
}: SelectMarketRadioGroupProps) => {
  const handleOnSelect = (market: Market) => {
    onSelect(market);
    onSwitch();
  };

  const markets = Object.values(Market)
    .map((market) => ({
      label: `s${market} / sUSD`,
      market,
      description: `${MARKET_TO_NAME[market]} Futures Market`,
      rawPrice: synthRates[`s${market}`],
      price: prettyFormatBigNumber(synthRates[`s${market}`], "0"),
    }))
    .filter(({ rawPrice }) => rawPrice); // Hide any markets with a 0 rate (unsupported on network).

  return (
    <div className="flex flex-col space-y-4 my-auto rounded-3xl font-light text-sm text-gray-300 bg-gray-900 p-4">
      <SelectedMarketHeader market={selected} onSwitch={onSwitch} />
      <RadioGroup value={selected} onChange={handleOnSelect}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {markets.map(({ label, market, description, price }) => (
            <RadioGroup.Option
              key={market}
              value={market}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-500",
                  active ? "border-gray-200 ring-2 ring-gray-200" : "",
                  "relative block bg-gray-700 w-80 border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:w-96 sm:flex sm:justify-between focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="text-sm flex flex-col space-y-2">
                      <RadioGroup.Label
                        as="span"
                        className="flex flex-row items-center space-x-2 font-medium text-lg text-gray-200"
                      >
                        <img
                          className="flex h-8 w-8 bg-gray-200 rounded-full"
                          src={
                            process.env.PUBLIC_URL +
                            `/tokens/${market.toLowerCase()}.webp`
                          }
                        />
                        <span>{label}</span>
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="text-gray-300"
                      >
                        {description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  <RadioGroup.Description
                    as="span"
                    className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:text-right"
                  >
                    <span className="font-base text-lg text-gray-200">
                      <span className="text-gray-300">$</span>
                      <span className="font-medium">{price}</span>
                    </span>
                  </RadioGroup.Description>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-gray-300" : "border-transparent",
                      "absolute -inset-px rounded-lg pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
