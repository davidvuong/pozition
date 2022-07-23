import styled from "styled-components";

const Section = styled.section.attrs({
  className: `
    flex
    flex-col
    items-center
    justify-center
    w-full
    h-full
  `,
})``;

const Message = styled.p.attrs({
  className: `
    text-gray-200
    uppercase
    p-2
    rounded-2xl
  `,
})``;

export const GalleryPage = () => {
  return (
    <Section>
      <Message>Coming soon... 👀</Message>
    </Section>
  );
};
