import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NewPozitionPage } from "./components/NewPozitionPage";
import { LandingPage } from "./components/LandingPage";

export const App = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
