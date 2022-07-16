import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { ethers } from "ethers";

interface MarginInputProps {
  maxMargin: number;
}

export const MarginInput = ({ maxMargin }: MarginInputProps) => (
  <div className="relative rounded-md shadow-sm hover:cursor-pointer">
    <input
      type="text"
      className="focus:ring-black-500 focus:border-black-500 appearance-none block w-full pr-10 border-gray-300 rounded-md"
      placeholder="$0"
    />
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <button className="uppercase text-gray-100 font-semibold text-sm bg-gray-500 p-1">
        max
      </button>
    </div>
  </div>
);
