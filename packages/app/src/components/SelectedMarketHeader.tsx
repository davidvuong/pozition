import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import { Market } from "../constants";

export interface SelectedMarketHeaderProps {
  market: Market;
  onSwitch: () => void;
}

export const SelectedMarketHeader = ({
  market,
  onSwitch,
}: SelectedMarketHeaderProps) => {
  return (
    <div className="flex flex-row justify-between pl-2">
      <div className="flex flex-row items-center space-x-1 font-semibold">
        <img
          className="flex h-6 w-6 rounded-full bg-gray-200"
          src={process.env.PUBLIC_URL + `/tokens/${market.toLowerCase()}.webp`}
        />
        <p className="flex items-center">s{market}</p>
        <span className="font-bold text-lg text-gray-500">/</span>{" "}
        <img
          className="h-6 w-6 rounded-full bg-gray-200"
          src={process.env.PUBLIC_URL + "/tokens/susd.webp"}
        />
        <p>sUSD</p>
      </div>
      <SwitchHorizontalIcon
        className="h-6 w-6 p-1 bg-gray-800 hover:bg-gray-700 hover:cursor-pointer rounded-full"
        onClick={() => onSwitch()}
      />
    </div>
  );
};
