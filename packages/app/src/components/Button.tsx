import styled from "styled-components";

export const PrimaryButton = styled.button.attrs({
  className: `
    inline-flex
    items-center
    px-6
    py-2
    text-base
    text-gray-200
    font-semibold
    rounded-md
    shadow-sm

    uppercase

    bg-gradient-to-r
    from-gray-800
    to-red-900

    hover:text-gray-100

    focus:outline-none
    focus:ring-gray-500
  `,
})``;
