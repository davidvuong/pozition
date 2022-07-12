/* This example requires Tailwind CSS v2.0+ */
import styled from "styled-components";
import { times } from "lodash";

const FunkyTitleText = styled.span.attrs({
  className: `
    mx-2

    font-semibold
    font-misto
    text-transparent
    text-4xl
    uppercase
    to-gray-50
    bg-clip-text
    bg-gradient-to-r
    from-gray-500
  `,
})``;

interface AnimatedTitleProps {
  children?: React.ReactNode;
  n?: number;
}

const AnimatedTitle = (props: AnimatedTitleProps) => (
  <div className="py-4 animate-marquee whitespace-nowrap">
    {times(props.n ?? 32).map((i) => (
      <FunkyTitleText key={i}>{props.children}</FunkyTitleText>
    ))}
  </div>
);

export const AnimatedPozitionSection = () => {
  return (
    <section className="justify-bottom bg-black">
      <div className="py-6 animate-marquee whitespace-nowrap lg:py-16">
        <AnimatedTitle>transferrable. future. pozitions</AnimatedTitle>
      </div>
    </section>
  );
};
