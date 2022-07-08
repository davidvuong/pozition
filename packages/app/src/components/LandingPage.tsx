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
        new Contract(obj.position, abi, provider[(chainId as 69 | 10) || 10]!).tokenURI(1).then((uri: string) => {
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
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
            Transferable &nbsp; Transferable &nbsp; Transferable &nbsp; Transferable &nbsp;
          </h1>
          <h1 className="headerLandingPage futures">
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp; Futures &nbsp;
            Futures &nbsp;
          </h1>
          <h1 className="headerLandingPage pozitions">
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
            Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp; Pozitions &nbsp;
          </h1>
          <button onClick={() => navigate('/gallery')}>Explore</button>
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
