import { useForm } from 'react-hook-form';
import { markets } from '../constants/markets';
import './CreatePosition.css';
import { useEffect, useState } from 'react';
import useNewPosition from '../hooks/useNewPosition';
import { useConnectWallet } from '../context/useConnectWalletContext';
import { Link } from 'react-router-dom';

export default function CreatePosition() {
  const [prices, setPrices] = useState<null | {
    link: number;
    bitcoin: number;
    ethereum: number;
  }>();
  const { register, handleSubmit } = useForm();
  const { connector } = useConnectWallet();
  const { calcDelta, approve, hasAllowance } = useNewPosition();
  const [allowance, setAllowance] = useState(false);
  const [typeOfPosition, setTypeOfPosition] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState<1 | 2 | 5 | 10>(1);
  const onSubmit = (data: any) => {
    calcDelta({ ...data, leverage, side: typeOfPosition, ...prices });
  };

  useEffect(() => {
    const init = async () => {
      const respEthereum = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const respBitcoin = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const respLink = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=usd');
      const { bitcoin } = await respBitcoin.json();
      const { ethereum } = await respEthereum.json();
      const { chainlink } = await respLink.json();
      setPrices({
        link: chainlink.usd,
        bitcoin: bitcoin.usd,
        ethereum: ethereum.usd,
      });
    };
    init();
  }, []);

  useEffect(() => {
    if (connector) {
      hasAllowance().then((data) => setAllowance(data));
    }
  }, [hasAllowance, connector]);

  const handleApprove = () => {
    approve().then(() => hasAllowance().then((data) => setAllowance(data)));
  };

  return (
    <>
      <div className="createPositionHeadline">
        <Link to="/">Back</Link>
        <h1>Create new Pozition</h1>
      </div>
      <div className="priceWrapper">
        <div className="price">
          <img src="/eth.png" width={32} height={32} />${prices?.ethereum}
        </div>
        <div className="price">
          <img src="/bitcoin.png" width={32} height={32} />${prices?.bitcoin}
        </div>
        <div className="price">
          <img src="/link.png" width={32} height={32} />${prices?.link}
        </div>
      </div>
      <div className="newPositionForm">
        <select {...register('market')}>
          <option value={markets.FuturesMarketLINK}>LINK</option>
          <option value={markets.FuturesMarketETH}>ETH</option>
          <option value={markets.FuturesMarketBTC}>BTC</option>
        </select>
        <span>sUSD</span>
        <input placeholder="$ Enter Amount" {...register('amount')} />
        <div className="buttonContainer">
          <button className="longButton" onClick={() => setTypeOfPosition('long')}>
            {typeOfPosition === 'long' ? 'Long - Active' : 'Long'}
          </button>
          <button className="shortButton" onClick={() => setTypeOfPosition('short')}>
            {typeOfPosition === 'short' ? 'Short - Active' : 'Short'}
          </button>
        </div>
        <div className="buttonContainer">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <button className="leverageButton" onClick={() => setLeverage(1)}>
              1x
            </button>
            {leverage === 1 && <span className="highlight"></span>}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <button className="leverageButton" onClick={() => setLeverage(2)}>
              2x
            </button>
            {leverage === 2 && <span className="highlight"></span>}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <button className="leverageButton" onClick={() => setLeverage(5)}>
              5x
            </button>
            {leverage === 5 && <span className="highlight"></span>}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <button className="leverageButton" onClick={() => setLeverage(10)}>
              10x
            </button>
            {leverage === 10 && <span className="highlight"></span>}
          </div>
        </div>

        {allowance ? (
          <button onClick={handleSubmit(onSubmit)} className="submitButton">
            Submit
          </button>
        ) : (
          <button onClick={handleApprove} className="submitButton">
            Approve
          </button>
        )}
      </div>
    </>
  );
}
