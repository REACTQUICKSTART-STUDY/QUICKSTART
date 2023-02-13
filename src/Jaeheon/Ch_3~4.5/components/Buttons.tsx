// styled-component를 이용하여 만든 버튼 모음
import styled from "styled-components";

const BasicButton = styled.button`
  background-color: purple;
  color: yellow;
  padding: 5px 10px;
  margin: 5px;
`;
const UnderLineButton = styled(BasicButton)`
  text-decoration: underline;
`;
const ItalicButton = styled(BasicButton)`
  font-style: italic;
`;
const WhiteUnderLineButton = styled(UnderLineButton)`
  color: white;
`;
const FooterThemeChangeButton = styled(BasicButton)`
  background-color: black;
  color: white;
`;

export {
  BasicButton,
  ItalicButton,
  UnderLineButton,
  WhiteUnderLineButton,
  FooterThemeChangeButton,
};
