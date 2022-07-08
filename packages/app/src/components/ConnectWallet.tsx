import WalletConnect from '@walletconnect/client';
import { useConnectWallet } from '../context/useConnectWalletContext';
import QRCodeModal from '@walletconnect/qrcode-modal';
import './ConnectWallet.css';
import { Link } from 'react-router-dom';

export default function ConnectWallet() {
  const { setConnector, connector, chainId } = useConnectWallet();
  const handleOnClick = () => {
    if (!connector) {
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      });
      setConnector(connector);
    }
  };

  if (chainId && connector) {
    return (
      <Link to="/profile" className="connectLink">
        {connector.accounts[0]
          .substring(0, 5)
          .concat('...')
          .concat(
            connector.accounts[0].substring(connector.accounts[0].length - 4)
          )}
      </Link>
    );
  } else {
    return (
      <div className="connectButtonWrapper">
        <button onClick={handleOnClick} className="connectWallet">
          <span className="buttonText">Connect Wallet</span>
        </button>
      </div>
    );
  }
}
