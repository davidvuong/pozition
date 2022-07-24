import styled from "styled-components";
import classNames from "classnames";
import Big from "big.js";
import { BigNumber, ethers } from "ethers";
import { TrendingUpIcon } from "@heroicons/react/solid";
import { Market, MARKET_TO_CONTRACTS } from "../constants";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useAccount, useNetwork } from "wagmi";
import { useSUSDBalance } from "../hooks/useSUSDBalance";
import { SelectedMarketHeader } from "./SelectedMarketHeader";
import { UnsafeAlert } from "./UnsafeAlert";
import { prettyFormatBigNumber } from "../utils";
import { PositionSide } from "../typed";
import { usePozitionContracts } from "../hooks/usePozitionContracts";

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

    disabled:opacity-50

    hover:text-gray-50
    disabled:hover:text-gray-200

    focus:outline-none
    focus:ring-gray-500
  `,
})``;

enum ExtendedPositionSide {
  UNKNOWN = "UNKNOWN",
}

type FormPositionSide = PositionSide | ExtendedPositionSide | undefined;

interface CreatePozitionValues {
  market: Market;
  margin: string | undefined;
  side: FormPositionSide;
  totalLeveragedAmount: string | undefined;
}

export interface NewPozitionFormProps {
  synthRates: Record<string, BigNumber>;
  market: Market;
  onSwitch: () => void;
}

export const NewPozitionForm = ({
  synthRates,
  market,
  onSwitch,
}: NewPozitionFormProps) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { balance: sUSDBalance, approve, isApproved } = useSUSDBalance();
  const { PozitionManagerContract } = usePozitionContracts();

  const initialFormValues: CreatePozitionValues = {
    market,
    margin: "",
    side: ExtendedPositionSide.UNKNOWN,
    totalLeveragedAmount: "",
  };

  const calcPositionSize = (
    totalLeveragedAmount: string | undefined,
    rate: BigNumber
  ): BigNumber => {
    if (
      !totalLeveragedAmount ||
      totalLeveragedAmount === "0" ||
      !rate ||
      rate.eq(0)
    ) {
      return BigNumber.from(0);
    }

    return BigNumber.from(
      new Big(totalLeveragedAmount)
        .div(ethers.utils.formatEther(rate))
        .mul(new Big(10).pow(18))
        .toFixed(0)
    );
  };

  const handleSubmit = async (
    values: CreatePozitionValues,
    actions: FormikHelpers<CreatePozitionValues>
  ) => {
    if (!isApproved) {
      await approve();
    } else {
      try {
        actions.setSubmitting(true);

        const marketRate = synthRates[`s${values.market}`] ?? BigNumber.from(0);
        if (marketRate.eq(0)) {
          throw new Error(`No market rate for market '${values.market}'`);
        }

        if (!values.margin || !values.totalLeveragedAmount) {
          return;
        }

        // Convert the strings to Big.js so we can operate on them.
        const size = calcPositionSize(values.totalLeveragedAmount, marketRate);
        const margin = BigNumber.from(
          new Big(values.margin).mul(new Big(10).pow(18)).toFixed(0)
        );
        const market = ethers.utils.formatBytes32String(
          MARKET_TO_CONTRACTS[values.market]
        );

        await PozitionManagerContract.depositMarginAndOpenPosition(
          margin,
          values.side === PositionSide.SHORT ? size.mul(-1) : size,
          market
        );
      } finally {
        actions.setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, setFieldValue }) => {
        const isSubmitButtonDisabled = () => {
          if (!isApproved) {
            return false;
          }
          return (
            isSubmitting ||
            !isConnected ||
            !values.margin ||
            !values.totalLeveragedAmount ||
            !values.side
          );
        };

        const getSubmitButtonLabel = () => {
          if (isSubmitting) {
            return "Submitting transaction...";
          }

          if (!isConnected) {
            return "Connect Wallet";
          }
          if (!isApproved) {
            return "Approve sUSD";
          }

          return "Open Pozition";
        };

        const marketRate = synthRates[`s${values.market}`] ?? BigNumber.from(0);
        const positionSize = calcPositionSize(
          values.totalLeveragedAmount,
          marketRate
        );

        const handleMaxMargin = () => {
          const nextMargin = sUSDBalance
            ? ethers.utils.formatEther(sUSDBalance.value)
            : "";

          setFieldValue("margin", nextMargin);
          setFieldValue("totalLeveragedAmount", nextMargin);
        };

        const handleUpdateLeverage = (leverage: number) => {
          if (!values.margin) {
            return;
          }
          setFieldValue(
            "totalLeveragedAmount",
            ethers.FixedNumber.from(values.margin)
              .mulUnsafe(ethers.FixedNumber.from(leverage))
              .toString()
          );
        };

        const handleUpdateSide = (side: FormPositionSide) =>
          setFieldValue("side", side);

        return (
          <>
            <UnsafeAlert />
            <Form
              className={classNames(
                "flex flex-col space-y-2 my-auto w-96 max-w-xl rounded-3xl font-light text-sm text-gray-300 bg-gray-900 p-4",
                { "opacity-50": isSubmitting }
              )}
            >
              <SelectedMarketHeader market={market} onSwitch={onSwitch} />

              <div className="flex flex-col relative bg-black-800 rounded-3xl h-40 p-4">
                <div className="flex justify-between w-full p-2 h-10">
                  <p className="flex uppercase tracking-tight font-semibold">
                    Margin
                  </p>
                  <div className="flex space-x-2 items-center">
                    <p>
                      Balance: {prettyFormatBigNumber(sUSDBalance?.value, "-")}
                    </p>
                    <button
                      type="button"
                      onClick={handleMaxMargin}
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
                    name="margin"
                    placeholder="100"
                  />
                </div>
                <div className="flex justify-between p-2 text-xs">
                  <p>sUSD Token {chain ? `(${chain.name})` : ""}</p>
                  <p>
                    1 sUSD ~$
                    {prettyFormatBigNumber(synthRates["sUSD"], "1.00")}
                  </p>
                </div>
                <TrendingUpIcon className="absolute h-6 w-6 -bottom-4 left-0 right-0 mx-auto bg-gray-800 p-1 rounded-full" />
              </div>

              <div className="flex flex-col space-y-4 border border-1 border-gray-800 rounded-3xl p-4">
                <div className="flex justify-between items-center">
                  <p className="p-2 uppercase tracking-tight font-semibold">
                    Leverage
                  </p>
                  <p>Size: {prettyFormatBigNumber(positionSize, "0", 6)}</p>
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
                    name="totalLeveragedAmount"
                  />
                </div>
                <div className="flex space-x-2 justify-center items-center">
                  {[PositionSide.LONG, PositionSide.SHORT].map((side, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleUpdateSide(side)}
                      className={classNames(
                        "uppercase text-xl rounded-lg font-semibold bg-gray-800 border-1 w-1/2 p-2",
                        {
                          "text-lime-900 bg-lime-400 hover:bg-lime-300":
                            side === PositionSide.LONG &&
                            values.side === PositionSide.LONG,
                          "text-red-900 bg-red-400 hover:bg-red-300":
                            side === PositionSide.SHORT &&
                            values.side === PositionSide.SHORT,
                        }
                      )}
                    >
                      {side}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2 justify-center items-center">
                  {[1, 2, 5, 10].map((leverage) => (
                    <button
                      key={leverage}
                      type="button"
                      className="w-20 p-2 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-xl text-center"
                      onClick={() => handleUpdateLeverage(leverage)}
                    >
                      {leverage}
                      <span className="text-gray-400">x</span>
                    </button>
                  ))}
                </div>
                <div className="text-right text-xs">
                  1 s{values.market} = ~{prettyFormatBigNumber(marketRate, "0")}{" "}
                  sUSD
                </div>
              </div>

              <OpenPositionButton
                disabled={isSubmitButtonDisabled()}
                type="submit"
              >
                {getSubmitButtonLabel()}
              </OpenPositionButton>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
