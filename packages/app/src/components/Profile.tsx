import axios from 'axios';
import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphQueryConfig } from '../constants/subgraph';
import { useConnectWallet } from '../context/useConnectWalletContext';
import BackButton from './BackButton';
import NFTPozition from './NFTPozition';
import './Profile.css';
import abi from '../abis/FuturesNFTPosition.json';

export default function ProfilePage() {
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
    <div className="profileContainer">
      {uris.length ? (
        uris.map((uri) => {
          return (
            <NFTPozition
              link={uri}
              onClick={() =>
                navigate(
                  '/pozition/'.concat(uri.split('/')[uri.split('/').length - 1])
                )
              }
            />
          );
        })
      ) : (
        <>
          <div
            style={{
              position: 'relative',
              width: '100%',
              marginBottom: '100px',
            }}
          >
            <span>
              Your gallery is empty. Create a new position to see them displayed
              here
            </span>
            <BackButton />
          </div>
        </>
      )}

      {!uris.length && (
        <button
          className="newPositionButton"
          onClick={() => navigate('/create')}
        >
          New Pozition
        </button>
      )}
    </div>
  );
}
