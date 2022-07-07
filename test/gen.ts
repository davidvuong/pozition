import { random, sample } from 'lodash';
import { SUPPORTED_MARKETS } from './utils';
import { ethers } from 'ethers';

// Utility

export const fromBNToNumber = (bn: ethers.BigNumber): number => parseFloat(ethers.utils.formatEther(bn));

// Generators

export const genNumberBetween = (min: number, max: number): ethers.BigNumber =>
  ethers.utils.parseEther(`${random(min, max, false)}`);

export const genMarginAmount = (min = 100, max = 1000): ethers.BigNumber => genNumberBetween(min, max);

export const genMarket = (): string => sample(SUPPORTED_MARKETS)!;
