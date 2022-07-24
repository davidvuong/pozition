import { Fragment, useContext } from "react";
import { Transition } from "@headlessui/react";
import { TransactionNotificationContext } from "../context/TransactionNotification";
import { useNetwork } from "wagmi";
import { getDefaultChainId, CHAIN_ETHERSCAN_URIS } from "../constants";

export const TransactionNotification = () => {
  const { chain } = useNetwork();
  const { show, transactionHash, hideNotification } = useContext(
    TransactionNotificationContext
  );

  const chainId = getDefaultChainId(chain);
  const etherscanUri = CHAIN_ETHERSCAN_URIS[chainId];

  const handleOnView = () => {
    hideNotification();
    window.open(etherscanUri + `tx/${transactionHash}`, "_blank");
  };

  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 mt-16 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
              <div className="w-0 flex-1 p-4">
                <div className="flex items-start">
                  <div className="ml-3 w-0 flex-1">
                    <p className="flex items-center text-sm uppercase font-medium text-gray-900">
                      Transaction Submitted
                    </p>
                    <p className="mt-1 text-sm truncate font-light text-gray-900">
                      {transactionHash}
                    </p>

                    <button
                      type="button"
                      className="flex justify-right bg-white rounded-md uppercase text-sm font-medium text-gray-900 mt-3 hover:text-gray-500"
                      onClick={() => hideNotification()}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  type="button"
                  className="uppercase w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-900 hover:text-gray-500"
                  onClick={handleOnView}
                >
                  View
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
