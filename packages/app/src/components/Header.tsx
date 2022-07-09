import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderLink = styled(Link).attrs({
  className: `
    text-stone-50
    p-2
  `,
})``;

export const Header = () => {
  return (
    <header>
      <div className="h-14 bg-gradient-to-r from-gray-900 to-gray-700">
        <HeaderLink to="/new">Pozition</HeaderLink>
        <HeaderLink to="/marketplace">Marketplace</HeaderLink>
      </div>
    </header>
  );
};
