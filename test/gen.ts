import { random } from 'lodash';
import { ethers } from 'ethers';

export const genMarginAmount = (min = 1000, max = 1_000_000): ethers.BigNumber =>
  ethers.BigNumber.from(random(min, max, false));
