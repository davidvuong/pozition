import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/Profile';
import CreatePosition from './components/CreatePosition';
import { Footer } from './components/Footer';
import Pozition from './components/Pozition';
import Gallery from './components/Gallery';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" key="landing-page" element={<LandingPage />} />
          <Route path="/create" key="landing-page" element={<CreatePosition />} />
          <Route path="/gallery" key="gallery-page" element={<Gallery />} />
          <Route path="/profile" key="profile-page" element={<ProfilePage />} />
          <Route path="/pozition/:id" element={<Pozition />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
