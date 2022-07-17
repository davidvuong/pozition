import styled from "styled-components";
import classNames from "classnames";
import { ethers } from "ethers";
import { SwitchHorizontalIcon, TrendingUpIcon } from "@heroicons/react/solid";
import { ADDRESSES, DEFAULT_MARKET, Market } from "../constants";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useAccount, useBalance, useNetwork } from "wagmi";

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
    via-red-900
    to-gray-800

    hover:text-gray-50

    focus:outline-none
    focus:ring-gray-500
  `,
})``;

interface CreatePozitionValues {
  market: Market;
  margin: string;
  side: string;
  size: string;
}

const initialFormValues: CreatePozitionValues = {
  market: DEFAULT_MARKET,
  margin: "",
  side: "",
  size: "",
};

export const CreatePozitionPage = () => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: sUSDBalance, isLoading: isLoadingSUSDBalance } = useBalance({
    addressOrName: address,
    token: ADDRESSES[chain!.id].SUSD,
  });

  const handleSubmit = (
    values: CreatePozitionValues,
    actions: FormikHelpers<CreatePozitionValues>
  ) => {
    console.log(values);
  };

  return (
    <section className="flex flex-col my-14 w-full items-center font-light text-sm">
      <Formik
        initialValues={initialFormValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form
            className={classNames(
              "flex flex-col space-y-2 my-auto w-96 max-w-xl rounded-3xl text-gray-300 bg-gray-900 p-4",
              { "opacity-50": isSubmitting }
            )}
          >
            <div className="flex flex-row justify-between pl-2">
              <div className="flex flex-row items-center space-x-1 font-semibold">
                <img
                  className="flex h-4 w-4"
                  src={process.env.PUBLIC_URL + "/tokens/eth.webp"}
                />
                <p className="flex items-center">sETH</p>
                <span className="font-bold text-lg text-gray-500">/</span>{" "}
                <img
                  className="h-4 w-4"
                  src={process.env.PUBLIC_URL + "/tokens/susd.webp"}
                />
                <p>sUSD</p>
              </div>
              <SwitchHorizontalIcon className="h-6 w-6 p-1 bg-gray-800 hover:bg-gray-700 hover:cursor-pointer rounded-full" />
            </div>

            <div className="flex flex-col relative bg-black-800 rounded-3xl h-40 p-4">
              <div className="flex justify-between w-full p-2 h-10">
                <p className="flex uppercase tracking-tight font-semibold">
                  Margin
                </p>
                <div className="flex space-x-2 items-center">
                  <p>
                    Balance:{" "}
                    {!sUSDBalance || isLoadingSUSDBalance
                      ? "-"
                      : (+ethers.utils.formatEther(sUSDBalance.value)).toFixed(
                          2
                        )}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "margin",
                        sUSDBalance
                          ? ethers.utils.formatEther(sUSDBalance.value)
                          : ""
                      )
                    }
                    className="font-semibold px-1 text-red-500 bg-gray-800 rounded-sm hover:text-red-400"
                  >
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
                <Field
                  className="bg-black-800 outline-none font-semibold text-2xl text-right p-2 w-48 h-14"
                  placeholder="100"
                  name="margin"
                />
              </div>
              <div className="flex justify-between p-2 text-xs">
                <p>sUSD Token (Optimism)</p>
                <p>1 sUSD ~$1.01</p>
              </div>
              <TrendingUpIcon className="absolute h-6 w-6 -bottom-4 left-0 right-0 mx-auto bg-gray-800 p-1 rounded-full" />
            </div>

            <div className="flex flex-col space-y-4 border border-1 border-gray-800 rounded-3xl p-4">
              <div className="flex justify-between items-center">
                <p className="p-2 uppercase tracking-tight font-semibold">
                  Leverage
                </p>
                <p>Size: 6.41238102</p>
              </div>

              <div className="flex flex-grow items-center justify-between px-2 bg-gray-800 rounded-lg">
                <div className="flex items-center bg-gray-900 h-10 items-center space-x-1 px-2 rounded-lg">
                  <img
                    className="h-6 w-6"
                    src={process.env.PUBLIC_URL + "/tokens/susd.webp"}
                  />
                  <p className="font-semibold text-lg">sUSD</p>
                </div>
                <Field
                  className="bg-gray-800 outline-none font-semibold text-2xl text-right p-2 w-48 h-14"
                  placeholder="1x"
                  name="size"
                />
              </div>
              <div className="flex space-x-2 justify-center items-center">
                <button className="uppercase text-xl rounded-lg font-semibold text-lime-900 border-1 bg-lime-300 hover:bg-lime-300 w-1/2 p-2">
                  Long
                </button>
                <button className="uppercase text-xl rounded-lg font-semibold text-red-900 border-1 bg-red-300 hover:bg-red-300 w-1/2 p-2">
                  Short
                </button>
              </div>
              <div className="flex space-x-2 justify-center items-center">
                <button
                  type="button"
                  className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center"
                >
                  1<span className="text-gray-400">x</span>
                </button>
                <button
                  type="button"
                  className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center"
                >
                  2<span className="text-gray-400">x</span>
                </button>
                <button
                  type="button"
                  className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center"
                >
                  5<span className="text-gray-400">x</span>
                </button>
                <button
                  type="button"
                  className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center"
                >
                  10<span className="text-gray-400">x</span>
                </button>
              </div>
              <div className="text-right text-xs">
                <p>1 sETH = ~1256.12 sUSD (~$1268.68) </p>
              </div>
            </div>

            <OpenPositionButton
              disabled={isSubmitting || !isConnected}
              type="submit"
            >
              {!isConnected
                ? "Connect Wallet"
                : isSubmitting
                ? "Processing..."
                : "Open Pozition"}
            </OpenPositionButton>
          </Form>
        )}
      </Formik>
    </section>
  );
};
