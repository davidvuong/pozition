import classNames from "classnames";
import { BigNumber } from "ethers";
import { useContext, useState } from "react";
import { useNetwork } from "wagmi";
import { CHAIN_ETHERSCAN_URIS, getDefaultChainId } from "../constants";
import { TransactionNotificationContext } from "../context/TransactionNotification";
import { prettyFormatBigNumber } from "../utils";
import type { PozitionMetadata } from "./MyPozitionsTable";

export interface MyPozitionsTableRowProps {
  synthRates: Record<string, BigNumber>;
  pozition: PozitionMetadata;
}

export const MyPozitionsTableRow = ({
  synthRates,
  pozition,
}: MyPozitionsTableRowProps) => {
  const { showNotification } = useContext(TransactionNotificationContext);
  const [isClosing, setIsClosing] = useState(false);
  const { chain } = useNetwork();
  const chainId = getDefaultChainId(chain);
  const etherscanUri = CHAIN_ETHERSCAN_URIS[chainId];

  const handleClosePozition = async () => {
    try {
      setIsClosing(true);
      const res = await pozition.contract.closeAndBurn();
      showNotification(res.hash);
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <li className="flex items-center justify-between w-full h-32 px-4 hover:bg-black-800">
      <div className="flex space-x-4">
        <a
          href={etherscanUri + `address/${pozition.contract.address}`}
          target="_blank"
        >
          <img
            src={
              process.env.PUBLIC_URL +
              `/pozitions/${pozition.side.toLowerCase()}.png`
            }
            alt={`Pozition Side: ${pozition.side}`}
            className="flex h24 w-24 rounded-full hover:cursor-pointer"
            draggable={false}
          />
        </a>

        <div className="flex flex-col justify-center space-y-2">
          <div className="flex flex-row items-center space-x-2">
            {/* TODO: It's so gross how we have to adhoc remove or add the 's' prefix */}
            <img
              className="flex h-6 w-6 rounded-full bg-gray-200"
              src={
                process.env.PUBLIC_URL +
                `/tokens/${pozition.marketKey.substring(1)}.webp`
              }
              draggable={false}
            />
            <h1 className="flex items-center text-3xl text-gray-200 font-light">
              <span>{pozition.marketKey} / sUSD</span>
              <span
                className={classNames(
                  "ml-2 rounded-full uppercase px-2 text-xs font-semibold leading-5",
                  {
                    "text-green-800 bg-green-200": pozition.isOpen,
                    "text-red-800 bg-red-200": !pozition.isOpen,
                  }
                )}
              >
                {pozition.isOpen ? "Open" : "Closed"}
              </span>
            </h1>
          </div>
          <p className="text-gray-200 font-light">
            Est. PRICE ~$
            {prettyFormatBigNumber(
              synthRates[pozition.marketKey],
              "0"
            )} USD <span className="text-xs">&#9679;</span>{" "}
            <span className="font-semibold">{pozition.side}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center h-32">
        <div className="flex flex-col justify-center px-2 h-28 w-48 border-r border-gray-800">
          <p className="flex uppercase text-gray-200 text-lg font-light">
            Size / Margin
          </p>
          <p className="flex text-gray-200">
            ~{prettyFormatBigNumber(pozition.originalSize.abs())} / $
            {prettyFormatBigNumber(pozition.originalMargin, "0", 2)} sUSD{" "}
          </p>
        </div>
        <div className="flex space-x-2 pl-4">
          <button className="uppercase text-sm text-gray-200 py-2 px-2 bg-gray-800 hover:bg-gray-600 rounded-lg">
            Transfer
          </button>
          <button
            className="uppercase text-sm text-gray-200 py-2 px-2 bg-gray-800 rounded-lg hover:bg-gray-600 disabled:hover:bg-gray-800 disabled:opacity-50"
            disabled={!pozition.isOpen || isClosing}
            onClick={handleClosePozition}
          >
            Close
          </button>
        </div>
      </div>
    </li>
  );
};
