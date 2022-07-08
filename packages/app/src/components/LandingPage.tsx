import Button from './Button';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useConnectWallet } from '../context/useConnectWalletContext';
import axios from 'axios';
import { graphQueryConfig } from '../constants/subgraph';
import { Contract } from 'ethers';
import abi from '../abis/FuturesNFTPosition.json';
import NFTPozition from './NFTPozition';

export default function LandingPage() {
  const navigate = useNavigate();
  const { provider, chainId } = useConnectWallet();
  const [uris, setUris] = useState(['']);
  useEffect(() => {
    axios(graphQueryConfig).then((res) => {
      res.data.data.positionOpeneds.map((obj: { position: string }) => {
        new Contract(obj.position, abi, provider[(chainId as 69 | 10) || 10]!)
          .tokenURI(1)
          .then((uri: string) => {
            axios({ method: 'GET', url: uri }).then((obj: any) => {
              setUris((state) => [...state, obj.data.image]);
            });
          });
      });
    });
  }, []);
  return (
    <>
      <section className="containerLandingPage">
        <div className="left">
          <h1 className="headerLandingPage transferable">
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
          </h1>
          <h1 className="headerLandingPage futures">
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures
            &nbsp; Futures &nbsp;
          </h1>
          <h1 className="headerLandingPage pozitions">
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
          </h1>
          <Button
            className="exploreButton"
            onClick={() => {
              navigate('/gallery');
            }}
          >
            Explore
            <svg
              width="27"
              height="28"
              viewBox="0 0 27 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: '16px', marginRight: '10px' }}
            >
              <rect
                x="14.3477"
                y="1.34961"
                width="17.8926"
                height="5.03229"
                transform="rotate(45 14.3477 1.34961)"
                fill="#1E1E1E"
              />
              <rect
                x="26.998"
                y="14.001"
                width="17.3334"
                height="4.47314"
                transform="rotate(135 26.998 14.001)"
                fill="#1E1E1E"
              />
              <rect
                x="25.6387"
                y="15.1924"
                width="23.8773"
                height="2.10097"
                transform="rotate(-180 25.6387 15.1924)"
                fill="#1E1E1E"
              />
            </svg>
          </Button>
        </div>
        <div className="right">
          <img src="/hero.png" width={'100%'} height={700} />
        </div>
      </section>
      <section className="pozitionsHeader">
        <h2>Pozitions Gallery</h2>
        <article style={{ display: 'flex', flexWrap: 'wrap' }}>
          {uris.map((uri) => (
            <NFTPozition link={uri} />
          ))}
        </article>
      </section>
    </>
  );
}
