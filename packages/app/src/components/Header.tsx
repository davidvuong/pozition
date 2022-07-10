import { Link } from "react-router-dom";
import styled from "styled-components";
import { PozitionHorizontalLogo } from "./images/PozitionHorizontalLogo";

const HeaderLink = styled(Link).attrs({
  className: `
    relative
    uppercase
    pt-7
    pr-8

    font-semibold
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-gray-400
    to-gray-100

    hover:text-gray-50
  `,
})``;

export const Header = () => {
  return (
    <header className="w-full">
      <div className="flex h-20 bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="pt-5 pl-8 pr-8">
          <Link to="/">
            <PozitionHorizontalLogo />
          </Link>
        </div>
        <HeaderLink to="/new">Pozition</HeaderLink>
        <HeaderLink to="/marketplace">Marketplace</HeaderLink>
      </div>
    </header>
  );
};
