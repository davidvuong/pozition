import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <div className="bg-red-100">
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
    </div>
  );
};
