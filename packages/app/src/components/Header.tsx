import { Link } from 'react-router-dom';
import { useConnectWallet } from '../context/useConnectWalletContext';
import { Logo } from '../components/images/Logo';
import ConnectWallet from '../components/ConnectWallet';

export const Header = () => {
  const { connector, chainId } = useConnectWallet();
  return (
    <header>
      <div>
        <Link to="/">
          <Logo className="p-4" />
        </Link>
        <Link to="/create">New Pozition</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
      <div>
        {connector && (
          <div>
            {(chainId === 10 || chainId === 69) && <img src="/op.png" width={16} height={16} alt="optimism" />}
            {chainId === 10
              ? 'Optimism'
              : chainId === 69
              ? 'Optimism Kovan'
              : chainId === 0
              ? 'Connecting'
              : 'Wrong Network - Use Optimism'}
          </div>
        )}
      </div>

      <ConnectWallet />
    </header>
  );
};
