import { useParams } from 'react-router-dom';
import { useConnectWallet } from '../context/useConnectWalletContext';
import { useContract } from '../context/useContract';
import NFTPozition from './NFTPozition';
import './Pozition.css';

export default function Pozition() {
  const param = useParams();
  const contracts = useContract();
  const { connector, chainId } = useConnectWallet();
  return (
    <div className="pozitionContainer">
      <h1>
        <div className="greyCircles"></div>My Pozition
        <div className="greyCircles"></div>
      </h1>
      <div className="spacer"></div>
      <NFTPozition
        link={'https://gateway.pinata.cloud/ipfs/'.concat(param.id || '')}
      />
      <div>
        <button
          onClick={() => {
            if (!!contracts && chainId) {
              contracts[
                chainId as 10 | 69
              ].FuturesPositionContract?.interface.encodeFunctionData(
                'transferFrom',
                [
                  (connector?.accounts[0],
                  '0xCc060DDBf7eBBCc7e61a91AC0FAf140Cc7C6692a',
                  0),
                ]
              );
            }
          }}
          className="actionButton"
        >
          Transfer
        </button>
        <button
          onClick={() => {
            if (!!contracts && chainId) {
              const data = contracts[
                chainId as 10 | 69
              ].FuturesPositionManager?.interface.encodeFunctionData(
                'closePosition',
                ['0xCc060DDBf7eBBCc7e61a91AC0FAf140Cc7C6692a']
              );
              connector?.sendTransaction({
                to: contracts[chainId as 10 | 69].FuturesPositionManager
                  ?.address,
                data,
                from: connector.accounts[0],
              });
            }
          }}
          className="actionButton"
        >
          Close Position
        </button>
      </div>
      <div className="spacer"></div>
    </div>
  );
}
