import styled from "styled-components";

export const PrimaryButton = styled.button.attrs({
  className: `
    inline-flex
    items-center
    px-6
    py-2
    text-base
    text-zinc-800
    font-bold
    rounded-md
    shadow-sm
    tracking-wide

    bg-gradient-to-r
    from-zinc-100
    to-zinc-400

    hover:from-zinc-400
    hover:to-zinc-700
    hover:text-zinc-50

    focus:outline-none
    focus:ring-zinc-500
  `,
})``;
