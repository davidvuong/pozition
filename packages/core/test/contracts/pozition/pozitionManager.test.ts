import { expect } from 'chai';
import { BigNumber, BigNumberish } from 'ethers';
import { ethers } from 'hardhat';
import { AddressResolverMock, ERC20Mock, Pozition, PozitionManager } from '../../../typechain';
import { genMarginAmount, genMarket, genNumberBetween } from '../../gen';
import { deployAllContracts } from '../../utils';

describe('PozitionManager', () => {
  let sUSDTotalSupply: BigNumber;
  let sUSDToken: ERC20Mock;
  let addressResolver: AddressResolverMock;
  let pozition: Pozition;
  let pozitionManager: PozitionManager;

  const approveAndDeposit = async (marginAmount: BigNumberish): Promise<void> => {
    const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
    await approveTx.wait();

    const depositTx = await pozitionManager.deposit(marginAmount);
    await depositTx.wait();
  };

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
      await approveAndDeposit(marginAmount);

      const depositedAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(depositedAmount.eq(marginAmount));
    });

    it('should error when the margin token is not approved', async () => {
      const marginAmount = genMarginAmount();
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user does not have enough margin tokens', async () => {
      const marginAmount = sUSDTotalSupply.add(ethers.utils.parseEther('10000')); // 10k more than available.
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user specifies negative margin', async () => {
      const approveTx = await sUSDToken.approve(pozitionManager.address, BigNumber.from(1));
      await approveTx.wait();

      const marginAmount = BigNumber.from(-1);
      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });

    it('should error when user specifies zero margin', async () => {
      const marginAmount = BigNumber.from(0);
      const approveTx = await sUSDToken.approve(pozitionManager.address, marginAmount);
      await approveTx.wait();

      await expect(pozitionManager.deposit(marginAmount)).to.be.reverted;
    });
  });

  describe('when withdrawing margin', () => {
    it('should successfully withdraw all margin when available', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      await approveAndDeposit(marginAmount);

      (await pozitionManager.withdraw(marginAmount, owner.address)).wait();

      const remainingAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(remainingAmount.eq(0));
    });

    it('should successfully partially withdraw when available', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const withdrawAmount = marginAmount.div(2);

      await approveAndDeposit(marginAmount);
      (await pozitionManager.withdraw(withdrawAmount, owner.address)).wait();

      const remainingAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(remainingAmount.eq(marginAmount.sub(withdrawAmount)));
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

      const approveTx = await sUSDToken.approve(pozitionManager.address, BigNumber.from(0));
      await approveTx.wait();

      const marginAmount = BigNumber.from(-1);
      await expect(pozitionManager.withdraw(marginAmount, owner.address)).to.be.reverted;
    });
  });

  describe('when opening a position', () => {
    it('should successfully mint a Pozition NFT', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const positionSize = genNumberBetween(1, 10);
      const market = ethers.utils.formatBytes32String(genMarket());

      await approveAndDeposit(marginAmount);

      const openPositionTx = await pozitionManager.openPosition(marginAmount, positionSize, market);
      await openPositionTx.wait();

      expect(await pozitionManager.mintedPositionsOf(owner.address)).to.have.lengthOf(1);
    });

    it('should successfully mint a Pozition NFT without using all margin', async () => {
      const [owner] = await ethers.getSigners();

      const marginAmount = genMarginAmount();
      const partialMarginAmount = marginAmount.div(2);
      const positionSize = genNumberBetween(1, 10);
      const market = ethers.utils.formatBytes32String(genMarket());

      await approveAndDeposit(marginAmount);

      const openPositionTx = await pozitionManager.openPosition(partialMarginAmount, positionSize, market);
      await openPositionTx.wait();

      expect(await pozitionManager.mintedPositionsOf(owner.address)).to.have.lengthOf(1);

      const depositedAmount = await pozitionManager.depositsByWalletAddress(owner.address);
      expect(depositedAmount.eq(marginAmount.sub(partialMarginAmount)));
    });

    it('should error when the margin amount is less than the amount deposited', async () => {
      const depositAmount = genMarginAmount();
      const marginAmount = depositAmount.add(ethers.utils.parseEther('100'));
      const positionSize = genNumberBetween(1, 10);
      const market = ethers.utils.formatBytes32String(genMarket());

      await approveAndDeposit(depositAmount);

      await expect(pozitionManager.openPosition(marginAmount, positionSize, market)).to.be.reverted;
    });

    it('should error when the margin amount is zero', async () => {
      const marginAmount = genMarginAmount();
      const positionSize = genNumberBetween(1, 10);
      const markets = ethers.utils.formatBytes32String(genMarket());

      await approveAndDeposit(marginAmount);

      await expect(pozitionManager.openPosition(BigNumber.from(0), positionSize, markets)).to.be.reverted;
    });

    it('should error when the margin amount is negative', async () => {
      const marginAmount = genMarginAmount();
      const positionSize = genNumberBetween(1, 10);
      const market = genMarket();
      const marketsBytes32 = ethers.utils.formatBytes32String(market);

      await approveAndDeposit(marginAmount);

      await expect(pozitionManager.openPosition(BigNumber.from(-1), positionSize, marketsBytes32)).to.be.reverted;
    });

    it('should error when the size is zero', async () => {
      const marginAmount = genMarginAmount();
      const positionSize = BigNumber.from(0);
      const market = genMarket();
      const marketsBytes32 = ethers.utils.formatBytes32String(market);

      await approveAndDeposit(marginAmount);

      await expect(pozitionManager.openPosition(marginAmount, positionSize, marketsBytes32)).to.be.reverted;
    });

    it('should error when the size is negative', async () => {
      const marginAmount = genMarginAmount();
      const positionSize = BigNumber.from(-1);
      const market = genMarket();
      const marketsBytes32 = ethers.utils.formatBytes32String(market);

      await approveAndDeposit(marginAmount);

      await expect(pozitionManager.openPosition(marginAmount, positionSize, marketsBytes32)).to.be.reverted;
    });

    it('should error when the specified market is not available', async () => {
      const marginAmount = genMarginAmount();
      const positionSize = genNumberBetween(1, 10);
      const markets = ethers.utils.formatBytes32String('INVALID_MARKET_SPECIFIED');

      await approveAndDeposit(marginAmount);

      await expect(pozitionManager.openPosition(marginAmount, positionSize, markets)).to.be.reverted;
    });
  });
});
