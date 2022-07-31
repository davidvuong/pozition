import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SwitchVerticalIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";

export interface TransferPozitionModalProps {
  open: boolean;
  onTransfer: (to: string) => void;
  onClose: () => void;
  isTransferring: boolean;
}

export const TransferPozitionModal = ({
  open,
  onTransfer,
  onClose,
  isTransferring,
}: TransferPozitionModalProps) => {
  const { address } = useAccount();
  const [toAddress, setToAddress] = useState("");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                    <SwitchVerticalIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 uppercase text-gray-200"
                    >
                      Transfer <span className="font-misto">Pozition</span>
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="px-3 py-2">
                    <label className="block text-xs text-gray-200 uppercase">
                      From
                    </label>
                    <input
                      type="text"
                      name="from"
                      className="block w-full bg-gray-800 border-0 py-2 px-0 text-gray-200 sm:text-sm"
                      disabled
                      placeholder={address}
                    />
                  </div>
                  <div className="mt-2 px-3 py-1">
                    <label className="block text-xs text-gray-200 uppercase">
                      To
                    </label>
                    <input
                      type="text"
                      name="to"
                      className="block w-full bg-gray-800 border-0 py-2 px-0 text-gray-200 sm:text-sm border-transparent focus:border-transparent focus:ring-0"
                      placeholder="0x..."
                      onChange={(event) => setToAddress(event.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base text-gray-200 uppercase hover:bg-gray-700 disabled:bg-gray-400 sm:text-sm"
                    disabled={
                      !toAddress || isTransferring || toAddress === address
                    }
                    onClick={() => onTransfer(toAddress)}
                  >
                    {isTransferring ? "Submitting transaction..." : "Transfer"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
