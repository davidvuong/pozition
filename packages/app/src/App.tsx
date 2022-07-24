import "./App.css";
import "./css/backgrounds.css";

import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreatePozitionPage } from "./pages/CreatePozitionPage";
import { LandingPage } from "./pages/LandingPage";
import { HodlPage } from "./pages/HodlPage";
import { TransactionNotification } from "./components/TransactionNotification";

export const App = () => {
  return (
    <div className="flex flex-col h-screen bg-black-800">
      <Header />
      <main className="flex-grow bg-black-800">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pozition" element={<CreatePozitionPage />} />
          <Route path="/hodl" element={<HodlPage />} />
        </Routes>
      </main>
      <TransactionNotification />
      <Footer />
    </div>
  );
};
