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
    /* transition: all 0.25s ease-in-out; */
  }
  html,
  body {
    background-color: ${colours.bg};
    font-family: ${fonts.primary};
    font-size: ${fontSizes.base};
    color: ${colours.white};
    font-weight: 400;
    font-style: normal;
    margin: 0;
    padding: 0;
    height: 90%;
    /* font-weight: 500; */
  }
  h2, p {
    font-weight: 400;
  }
`;

export default GlobalStyle;
