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
    to-red-700

    shadow
    shadow-lg
    shadow-gray-100/10

    hover:from-red-700
    hover:to-gray-700
    hover:text-gray-50

    focus:outline-none
    focus:ring-gray-500
  `,
})``;
