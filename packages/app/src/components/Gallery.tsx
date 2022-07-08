import axios from 'axios';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { graphQueryConfig } from '../constants/subgraph';
import { useConnectWallet } from '../context/useConnectWalletContext';
import './Gallery.css';
import abi from '../abis/FuturesNFTPosition.json';
import NFTPozition from './NFTPozition';

export default function Gallery() {
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
      <h1>Gallery</h1>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {uris.length && uris.map((uri) => <NFTPozition link={uri} />)}
      </div>
    </>
  );
}
