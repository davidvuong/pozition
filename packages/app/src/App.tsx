import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeaderV2 } from "./components/HeaderV2";
import { LandingPage } from "./components/LandingPage";
import { NewPozitionPage } from "./components/NewPozitionPage";
import { LandingPageV2 } from "./components/LandingPageV2";

export const App = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <HeaderV2 />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPageV2 />} />
          <Route path="/new" element={<NewPozitionPage />} />
          {/* <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pozition/:id" element={<Pozition />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
