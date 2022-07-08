import './App.css';
import ConnectWallet from './components/ConnectWallet';
import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/Profile';
import CreatePosition from './components/CreatePosition';
import Footer from './components/Footer';
import { useConnectWallet } from './context/useConnectWalletContext';
import Pozition from './components/Pozition';
import Gallery from './components/Gallery';

function App() {
  const { connector, chainId } = useConnectWallet();

  return (
    <>
      <div className="app">
        <header className="header">
          <svg
            width="193"
            height="32"
            viewBox="0 0 193 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 31.4921H1.02638V21.5365H16.08C18.9881 21.5365 21.4514 19.6741 21.4514 16.9651V15.4074C21.4514 10.9376 21.383 7.78836 12.2824 7.78836H0V31.4921Z"
              fill="#D7D7D7"
            />
            <path
              d="M37.1339 7.31429H35.8338C28.4781 7.31429 23.0041 12.8339 23.0041 19.6402C23.0041 26.4804 28.4781 32 35.8338 32H37.1339C44.3528 32 49.9295 26.4804 49.9295 19.6402C49.9295 12.8339 44.3528 7.31429 37.1339 7.31429Z"
              fill="#D7D7D7"
            />
            <path
              d="M51.1226 7.82222V13.7481H68.4001L49.9252 30.2392V31.4921H74.5926V25.5661H56.5625L75.0031 9.07513V7.82222H51.1226Z"
              fill="#D7D7D7"
            />
            <path
              d="M80.8169 2.74286C80.8169 4.2328 79.5852 5.45185 78.0799 5.45185C76.5745 5.45185 75.3428 4.2328 75.3428 2.74286C75.3428 1.21905 76.5745 0 78.0799 0C79.5852 0 80.8169 1.21905 80.8169 2.74286ZM78.5588 7.78836V31.4921H77.5667V7.78836H78.5588Z"
              fill="#D7D7D7"
            />
            <path
              d="M93.5836 31.4921V13.7143H105.045V7.78836H81.1644V13.7143H92.5914V31.4921H93.5836Z"
              fill="#D7D7D7"
            />
            <path
              d="M110.853 2.74286C110.853 4.2328 109.622 5.45185 108.116 5.45185C106.611 5.45185 105.379 4.2328 105.379 2.74286C105.379 1.21905 106.611 0 108.116 0C109.622 0 110.853 1.21905 110.853 2.74286ZM108.595 7.78836V31.4921H107.603V7.78836H108.595Z"
              fill="#D7D7D7"
            />
            <path
              d="M125.673 7.31429H124.373C117.017 7.31429 111.543 12.8339 111.543 19.6402C111.543 26.4804 117.017 32 124.373 32H125.673C132.892 32 138.468 26.4804 138.468 19.6402C138.468 12.8339 132.892 7.31429 125.673 7.31429Z"
              fill="#D7D7D7"
            />
            <path
              d="M141.518 10.6667L159.583 31.4921H165.57V7.78836H164.578V28.6138L146.513 7.78836H140.526V31.4921H141.518V10.6667Z"
              fill="#D7D7D7"
            />
            <path
              d="M180.001 7.31429C186.467 7.31429 191.188 10.5651 192.865 16.7958L191.428 17.0667C188.623 13.9852 184.722 13.2741 180.822 13.2741H178.975C175.245 13.2741 168.745 14.2899 168.745 17.0328C168.745 18.455 170.524 19.0984 176.716 19.0984H185.988C188.178 19.0984 192.215 19.3354 192.215 22.654C192.215 27.3608 187.63 32 180.446 32C172.611 32 168.813 28.072 167.205 22.5185L168.608 22.2476C171.585 25.1598 174.63 26.1079 179.248 26.1079H181.096C185.133 26.1079 191.188 24.855 191.188 22.2815C191.188 20.0127 186.98 20.0127 181.951 20.0127H174.322C171.14 20.0127 167.65 19.6741 167.65 16.6603C167.65 13.782 170.832 7.31429 180.001 7.31429Z"
              fill="#D7D7D7"
            />
          </svg>

          <Link to="/">Home</Link>
          <Link to="/create">New Pozition</Link>
          <Link to="/gallery">Gallery</Link>
          {connector && (
            <div className="networkDisplay">
              {(chainId === 10 || chainId === 69) && (
                <img src="/op.png" width={16} height={16} alt="optimism" />
              )}
              {chainId === 10
                ? 'Optimism'
                : chainId === 69
                ? 'Optimism Kovan'
                : chainId === 0
                ? 'Connecting'
                : 'Wrong Network - Use Optimism'}
            </div>
          )}
          <ConnectWallet />
        </header>
        <main className="mainContent">
          <Routes>
            <Route path="/" key="landing-page" element={<LandingPage />} />
            <Route
              path="/create"
              key="landing-page"
              element={<CreatePosition />}
            />
            <Route path="/gallery" key="gallery-page" element={<Gallery />} />
            <Route
              path="/profile"
              key="profile-page"
              element={<ProfilePage />}
            />
            <Route path="/pozition/:id" element={<Pozition />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
