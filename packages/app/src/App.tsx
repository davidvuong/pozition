import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div />} />
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
