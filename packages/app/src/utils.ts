import { BigNumber, ethers } from "ethers";

export const prettyFormatBigNumber = (
  value: BigNumber | undefined,
  defaultValue = "",
  decimals = 4
): string =>
  value
    ? (+ethers.utils.formatEther(value)).toLocaleString(undefined, {
        maximumFractionDigits: decimals,
      })
    : defaultValue;
