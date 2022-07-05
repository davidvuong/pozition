import { expect } from 'chai';
import { ethers } from 'hardhat';
import { AddressResolverMock, ERC20Mock, Pozition, PozitionManager } from '../../../typechain';
import { genMarginAmount } from '../../gen';

describe('PozitionManager', () => {
  let sUSDToken: ERC20Mock;
  let addressResolver: AddressResolverMock;
  let pozition: Pozition;
  let pozitionManager: PozitionManager;

  before(async () => {
    const SUSDToken = await ethers.getContractFactory('ERC20Mock');
    sUSDToken = await SUSDToken.deploy();
    await sUSDToken.deployed();

    const AddressResolver = await ethers.getContractFactory('AddressResolverMock');
    addressResolver = await AddressResolver.deploy();
    await addressResolver.deployed();

    await addressResolver.registerAddress(ethers.utils.formatBytes32String('ProxyERC20sUSD'), sUSDToken.address);

    const Pozition = await ethers.getContractFactory('Pozition');
    pozition = await Pozition.deploy();
    await pozition.deployed();

    const PozitionManager = await ethers.getContractFactory('PozitionManager');
    pozitionManager = await PozitionManager.deploy(addressResolver.address, pozition.address);
    await pozitionManager.deployed();
  });

  describe('when depositing margin', () => {
    it('should successfully deposit sUSD into manager', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      await pozitionManager.deposit(marginAmount);

      const depositedAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(depositedAmount.eq(marginAmount));
    });

    it('should error when the margin token is not approved', async () => {
      const marginAmount = genMarginAmount();
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user does not have enough margin tokens', async () => {
      const marginAmount = ethers.BigNumber.from(`${Number.MAX_SAFE_INTEGER}`);
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user specifies negative margin', async () => {
      const marginAmount = ethers.BigNumber.from(-1);
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user specifies zero margin', async () => {
      const marginAmount = ethers.BigNumber.from(0);
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });
  });

  describe('when withdrawing margin', () => {
    it('should successfully withdraw when margin is available', async () => {});
  });
});
