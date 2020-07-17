import React from "react";
// import "../App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import styled from "styled-components";
import theme from "../styles/theme";
import Main from "../styles/Main";
// WHY WAS DESTRUCTURED IMPORT NOT WORKING?
import IconLogo from "./icons/IconLogo";
import IconAbout from "./icons/IconAbout";
import IconShare from "./icons/IconShare";
import IconGithub from "./icons/IconGithub";
import IconFacebook from "./icons/IconFacebook";
import IconTwitter from "./icons/IconTwitter";
import IconLinkedin from "./icons/IconLinkedin";

const LoginNav = styled.nav`
  position: relative;
  flex: 0 1 auto;
  margin: 0;
  padding: 25px;
  width: auto;
  display: flex;
  align-items: center;
  color: white;
  justify-content: flex-start;
  z-index: 1;
`;

const Logo = styled.button`
  fill: white;
  margin-left: 25px;
  transition: fill 0.25s ease-in-out;
  border: none;
  background: none;
  padding: 0;
  &:hover,
  &:focus {
    cursor: pointer;
    fill: ${theme.colours.green};
  }
`;

const NavButton = styled.button`
  color: white;
  margin-left: 25px;
  padding: 0;
  background: none;
  border: none;
  fill: white;
  transition: fill 0.25s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    fill: ${theme.colours.green};
  }
  svg {
    width: 24px;
    height: 24px;
  }
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Main>
        <LoginNav>
          <Logo
            fill={theme.colours.bg}
            onClick={() => window.location.reload()}
          >
            <IconLogo />
          </Logo>
          <NavButton>
            <IconAbout width="36px" height="36px" />
          </NavButton>
          <NavButton>
            <IconShare width="36px" height="36px" />
          </NavButton>
        </LoginNav>
        <h1>Login</h1>
      </Main>
    );
  }
}

export default Login;
