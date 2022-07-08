import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { Link } from 'react-router-dom';
import { useConnectWallet } from '../context/useConnectWalletContext';

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

  return chainId && connector ? (
    <Link to="/profile">
      {connector.accounts[0]
        .substring(0, 5)
        .concat('...')
        .concat(connector.accounts[0].substring(connector.accounts[0].length - 4))}
    </Link>
  ) : (
    <button onClick={handleOnClick}>
      <span>Connect Wallet</span>
    </button>
  );
}
