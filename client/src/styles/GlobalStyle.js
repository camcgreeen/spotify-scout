import { createGlobalStyle } from "styled-components";
import theme from "./theme";
const { colours, fonts, fontSizes } = theme;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Circular Std Book";
    src: local("Circular Std Book"),
      url("./fonts/CircularStd-Book.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
  }
  *,
  #root {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    background-color: #181818;
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    color: ${colours.white};
    font-weight: 400;
    font-style: normal;
    margin: 0;
    padding: 0;
    height: 90%;
    font-weight: 500;
  }
`;

export default GlobalStyle;
