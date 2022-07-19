import { BigNumber, ethers } from "ethers";

export const prettyFormatBigNumber = (
  value: BigNumber | undefined,
  defaultValue = ""
): string =>
  value ? (+ethers.utils.formatEther(value)).toFixed(2) : defaultValue;
