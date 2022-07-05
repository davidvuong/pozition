import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { AddressResolverMock, ERC20Mock, Pozition, PozitionManager } from '../../../typechain';
import { genMarginAmount } from '../../gen';
import { deployAllContracts } from '../../utils';

describe('PozitionManager', () => {
  let sUSDTotalSupply: BigNumber;
  let sUSDToken: ERC20Mock;
  let addressResolver: AddressResolverMock;
  let pozition: Pozition;
  let pozitionManager: PozitionManager;

  beforeEach(async () => {
    const deployed = await deployAllContracts();
    sUSDTotalSupply = deployed.sUSDTotalSupply;
    sUSDToken = deployed.sUSDToken;
    addressResolver = deployed.addressResolver;
    pozition = deployed.pozition;
    pozitionManager = deployed.pozitionManager;
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
      const marginAmount = sUSDTotalSupply.add(10_000); // 10k more than available.
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user specifies negative margin', async () => {
      const approveTx = await sUSDToken.approve(pozitionManager.address, ethers.BigNumber.from(1));
      await approveTx.wait();

      const marginAmount = ethers.BigNumber.from(-1);
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user specifies zero margin', async () => {
      const marginAmount = ethers.BigNumber.from(0);
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });
  });

  describe('when withdrawing margin', () => {
    it('should successfully withdraw all margin when available', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      (await pozitionManager.deposit(marginAmount)).wait();
      (await pozitionManager.withdraw(marginAmount, owner.address)).wait();

      const remainingAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(remainingAmount.eq(0));
    });

    it('should successfully partially withdraw when available', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const withdrawAmount = marginAmount.div(3);
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      (await pozitionManager.deposit(marginAmount)).wait();
      (await pozitionManager.withdraw(withdrawAmount, owner.address)).wait();

      const remainingAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(remainingAmount.eq(withdrawAmount.sub(withdrawAmount)));
    });

    it('should error when withdrawing margin when none available', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      await expect(pozitionManager.withdraw(marginAmount, owner.address)).to.be.reverted;
    });

    it('should error when withdrawing negative margin', async () => {
      const [owner] = await ethers.getSigners();

      const approveTx = await sUSDToken.approve(pozitionManager.address, ethers.BigNumber.from(0));
      await approveTx.wait();

      const marginAmount = ethers.BigNumber.from(-1);
      await expect(pozitionManager.withdraw(marginAmount, owner.address)).to.be.reverted;
    });
  });
});
