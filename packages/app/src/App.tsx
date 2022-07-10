import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/create" element={<CreatePosition />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pozition/:id" element={<Pozition />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};
