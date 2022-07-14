import styled from "styled-components";

export const PrimaryButton = styled.button.attrs({
  className: `
    inline-flex
    items-center
    px-6
    py-2
    text-base
    text-gray-200
    font-bold
    rounded-md
    shadow-sm
    tracking-wide

    bg-gradient-to-r
    from-gray-700
    to-red-800

    hover:shadow
    hover:shadow-lg
    hover:shadow-red-700/30

    focus:outline-none
    focus:ring-gray-500
  `,
})``;
