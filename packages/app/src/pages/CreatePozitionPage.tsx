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
    <section>
      <div className="flex flex-col items-center justify-center sm:flex-row sm:mt-32">
        {/* <Formik
          initialValues={initialFormValues}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form
              className={classNames(
                "grid grid-cols-1 p-6 gap-3 md:grid-cols-2 sm:gap-4 bg-white rounded-lg",
                {
                  "opacity-50": isSubmitting,
                }
              )}
            >
              <TextInput name="firstName" placeholder="First name" />
            </Form>
          )}
        </Formik> */}
      </div>
    </section>
  );
};
