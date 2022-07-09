import { Link } from "react-router-dom";
import { Logo } from "./images/Logo";

export const Header = () => {
  return (
    <header>
      <div className="bg-black">
        <Link to="/">
          <Logo className="p-4" />
        </Link>
        <Link to="/create">New Pozition</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </header>
  );
};
