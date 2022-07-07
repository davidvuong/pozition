import { BigNumber } from 'ethers';
import { random, sample } from 'lodash';
import { SUPPORTED_MARKETS } from './utils';

export const genNumberBetween = (min: number, max: number): BigNumber => BigNumber.from(`${random(min, max)}`);

export const genMarginAmount = (min = 1000, max = 10_000): BigNumber => genNumberBetween(min, max);

export const genMarket = (): string => sample(SUPPORTED_MARKETS)!;
