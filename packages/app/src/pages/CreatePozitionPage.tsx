import { useState } from "react";
import {
  DEFAULT_MARKET,
  Market,
  MARKET_LABELS,
  MARKET_TV_TRADING_PAIR,
  MARKET_LOGO_PATH,
} from "../constants/markets";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as TV from "react-tradingview-components";
import { SelectMenu, SelectMenuItem } from "../components/SelectMenu";
import { MarginInput } from "../components/MarginInput";
import styled from "styled-components";
import classNames from "classnames";
import { ChevronDownIcon, TrendingUpIcon } from "@heroicons/react/solid";

export const OpenPositionButton = styled.button.attrs({
  className: `
    mt-2
    px-6
    py-2
    w-full
    text-center
    text-base
    text-gray-200
    font-semibold
    rounded-md
    shadow-sm

    uppercase

    bg-gradient-to-r
    from-gray-800
    to-red-900

    hover:text-gray-50

    focus:outline-none
    focus:ring-gray-500
  `,
})``;

const TextInput = styled(Field).attrs({
  className: `
    outline-none
    focus:border-transparent
    border-2
    border-gray-200
    px-5
    py-3
    w-full
    rounded-md
    focus:ring-2
    focus:ring-cyan-600
  `,
})``;

export const CreatePozitionPage = () => {
  const marketOptions = Object.values(Market).map((market) => ({
    key: market,
    label: MARKET_LABELS[market],
    imageUrl: MARKET_LOGO_PATH[market],
  }));

  const [selectedMarket, setSelectedMarket] = useState<SelectMenuItem>(
    marketOptions.find(({ key }) => key === DEFAULT_MARKET)!
  );

  const onSubmit = () => {};
  const initialFormValues = {};

  return (
    <section className="flex flex-col mt-14 w-full items-center font-light text-sm">
      <div className="flex flex-col space-y-4 my-auto w-96 max-w-xl rounded-3xl text-gray-300 bg-gray-900 p-4">
        <div className="flex flex-col relative bg-black-800 rounded-3xl h-40 p-4">
          <div className="flex justify-between w-full p-2 h-10">
            <p className="flex uppercase tracking-tight font-semibold">
              Margin
            </p>
            <div className="flex space-x-2 items-center">
              <p>Balance: 10,539.13</p>
              <button className="font-semibold px-1 text-red-500 bg-gray-800 rounded-sm hover:text-red-400">
                MAX
              </button>
            </div>
          </div>
          <div className="flex flex-grow items-center justify-between px-2">
            <div className="flex items-center bg-gray-900 hover:bg-gray-800 h-10 items-center space-x-1 px-2 rounded-lg">
              <img
                className="h-6 w-6"
                src={process.env.PUBLIC_URL + "/tokens/susd.webp"}
              />
              <p className="font-semibold text-lg">sUSD</p>
            </div>
            <input
              className="bg-black-800 outline-none font-semibold text-2xl text-right p-2 w-48 h-14"
              placeholder="100"
            />
          </div>
          <div className="flex justify-between p-2 text-xs">
            <p>sUSD Token (Optimism)</p>
            <p>1 sUSD ~$1.01</p>
          </div>
          <TrendingUpIcon className="absolute h-6 w-6 -bottom-3 left-0 right-0 mx-auto bg-gray-800 p-1 rounded-full" />
        </div>

        <div className="flex flex-col space-y-4 border border-1 border-gray-800 rounded-3xl p-4">
          <p className="p-2 uppercase tracking-tight font-semibold">
            Market / Leverage
          </p>
          <div className="flex items-center bg-gray-800 hover:bg-gray-700 h-12 items-center space-x-2 px-4 rounded-lg">
            <img
              className="flex h-6 w-6"
              src={process.env.PUBLIC_URL + "/tokens/btc.webp"}
            />
            <p className="font-semibold text-lg">
              sBTC <span className="font-bold text-xl text-gray-500">/</span>{" "}
              sUSD
            </p>
            <ChevronDownIcon className="flex h-4 w-4 justify-right" />
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <button className="uppercase text-xl rounded-lg font-semibold text-green-800 border-1 bg-green-400 hover:bg-green-300 w-1/2 p-2">
              Long
            </button>
            <button className="uppercase text-xl rounded-lg font-semibold text-red-800 border-1 bg-red-400 hover:bg-red-300 w-1/2 p-2">
              Short
            </button>
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <button className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center">
              1<span className="text-gray-400">x</span>
            </button>
            <button className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center">
              2<span className="text-gray-400">x</span>
            </button>
            <button className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center">
              5<span className="text-gray-400">x</span>
            </button>
            <button className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center">
              10<span className="text-gray-400">x</span>
            </button>
          </div>
          <div className="text-right text-xs">
            <p>1 sBTC = ~21,791.51 sUSD (~$21,575.75) </p>
          </div>
        </div>

        <OpenPositionButton>Open Pozition</OpenPositionButton>
      </div>
    </section>
  );
};
