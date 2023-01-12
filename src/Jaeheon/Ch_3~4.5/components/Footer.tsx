import React from "react";
import styled from "styled-components";

type FooterPropsType = {
  theme: string;
};

const Footer = ({ theme }: FooterPropsType) => {
  return <FooterBox theme={theme}>React styled-components test</FooterBox>;
};

const FooterBox = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1rem;
  background-color: ${({ theme }) =>
    theme === "basic" ? "skyblue" : "yellowgreen"};
  text-align: center;
`;

export default Footer;
