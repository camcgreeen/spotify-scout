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
  /* padding: 25px; */
  padding-top: 25px;
  height: 25px;
  /* width: auto; */
  display: flex;
  align-items: center;
  color: white;
  justify-content: flex-start;
  z-index: 1;
  /* background-color: green; */
`;

const NavButton = styled.button`
  color: white;
  margin: 0;
  margin-left: 25px;
  padding: 0;
  background: none;
  border: none;
  fill: white;
  transition: fill 0.25s ease-in-out;
  svg {
    width: 24px;
    height: 24px;
  }
  &:hover,
  &:focus {
    cursor: pointer;
    fill: ${theme.colours.green};
  }
  @media screen and (max-width: 650px) {
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const Logo = styled.h1`
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 18px;
  position: relative;
  top: -0.125em;
  padding: 0;
  transition: color 0.25s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    color: ${theme.colours.green};
  }
  @media screen and (max-width: 650px) {
    font-size: 14px;
  }
`;

const Content = styled.div`
  display: grid;
  margin: 0;
  padding: 80px;
  width: calc(100vw - 160px);
  /* this is hard coded at 75px as this is the navheight atm, change this later */
  height: calc(100vh - 75px - 160px);
  text-align: left;
  /* background-color: grey; */
  grid-auto-columns: 1fr 1fr;
  h1,
  h2 {
    margin: 0;
    padding: 0;
    grid-column-start: 1;
    grid-column-end: 2;
    /* background-color: orange; */
    align-self: center;
  }
  h1 {
    font-size: 48px;
    /*  this is the bit to change to get the line break effect */
    /* width: 35%; */
  }
  h2 {
    font-size: 18px;
  }
  @media screen and (max-width: 650px) {
    grid-auto-columns: 1fr;
    text-align: center;
  }
`;

const LoginArea = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  /* background-color: orange; */
  align-self: center;
  margin: 0;
  padding: 0;
  /* same width as button to make centering p easier */
  /* width: 300px; */
  /* display: flex;
  flex-direction: column;cm
  align-items: center; */
  p {
    text-align: center;
    margin-left: 120px;
    margin-top: 10px;
    transform: translateX(-50%);
  }
  a {
    color: #c8c8c8;
    &:visited {
      color: #707070;
    }
  }

  @media screen and (max-width: 650px) {
    margin: 0 auto;
  }
`;

const LoginButton = styled.button`
  border: none;
  box-shadow: 4px 4px 2px #222;
  background: none;
  margin: 0;
  width: 240px;
  height: 75px;
  /* font-family: "Circular Std Book", "sans-serif"; */
  font-size: 18px;
  background-color: ${theme.colours.green};
  /* font-weight: 400; */
  color: white;
  border-radius: 40px;
  padding: 22px 38px;
  text-decoration: none;
  transition: 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    /* padding: 22px 44px; */
    /* background-color: #1ed760; */
  }
`;

// const Carousel = styled.div`
// width: 350px;
// height: 350px;
// background-color: white;
// grid-column-start: 2;
// grid-column-end: 3;
// grid-row-start: 1;
// grid-row-end: 4;
// justify-self: end;
// margin: auto 0;

//   @media screen and (max-width: 650px) {
//     grid-column-start: 1;
//     grid-column-end: 2;
//     grid-row-start: 3;
//     grid-row-end: 4;
//     margin: 0 auto;
//   }
// `;

const Carousel = styled.div`
  width: 400px;
  height: 400px;
  /* background-color: white; */
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 4;
  justify-self: center;
  margin: auto 0;
  /* transition: width 0.25s ease-in-out, height 0.25s ease-in-out; */
  div {
    /* position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    margin: 0;
    padding: 0;
    img {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      object-fit: cover;
      width: 100%;
      height: 100%;
    } */
  }
  .slick-dots li {
    button::before {
      margin-top: 14px !important;
      color: #fff !important;
      opacity: 1 !important;
      transition: 0.3s ease-in-out;
      font-size: 8px;
    }
    &.slick-active button::before {
      font-size: 18px;
      color: ${theme.colours.green} !important;
      opacity: 1 !important;
    }
  }
  @media screen and (max-width: 600px) {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
  }
`;

const Carousel2 = styled.div`
  width: 50%;
  height: 50%;
  padding: 40px;
  background-color: blue;
  /* div {
    width: 20px;
    height: 20px;
    background-color: lightblue;
  } */
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  createSlide(artistName, imageSrc) {
    return (
      <div>
        <img src={imageSrc} alt="" />
      </div>
    );
  }
  render() {
    const sliderSettings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      draggable: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      fade: true,
      cssEase: "ease-in-out",
    };
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      // <Main>
      //   <LoginNav>
      //     <NavButton
      //       id="logo"
      //       fill={theme.colours.bg}
      //       onClick={() => window.location.reload()}
      //     >
      //       <Logo>SCOUT</Logo>
      //     </NavButton>
      //     <NavButton>
      //       <IconAbout />
      //     </NavButton>
      //     <NavButton>
      //       <IconShare />
      //     </NavButton>
      //   </LoginNav>
      //   <Content>
      //     <h1>
      //       Find music{" "}
      //       <span style={{ color: theme.colours.green }}>you love</span>
      //     </h1>
      //     <h2>Explore new music easily and conveniently.</h2>
      //     <LoginArea>
      //       <a href="http://192.168.1.143:8888/login">
      //         <LoginButton
      //           onClick={"location.href = http://192.168.1.143:8888/login"}
      //         >
      //           Log in with Spotify
      //         </LoginButton>
      //       </a>
      //       <p>
      //         <a
      //           href="https://developer.spotify.com/documentation/web-api/"
      //           target="_blank"
      //           rel="noopener noreferrer"
      //         >
      //           Don't have a Spotify account?
      //         </a>
      //       </p>
      //     </LoginArea>
      //     <Carousel>
      //       <Slider {...sliderSettings}>
      //         {this.createSlide(
      //           "Tame Impala",
      //           // "neo-psychedlic",
      //           "../img/tame-impala-640.jfif"
      //         )}
      //         {this.createSlide(
      //           "The Weeknd",
      //           // "contemporary r&b",
      //           "../img/the-weeknd-640.jfif"
      //         )}
      //         {this.createSlide("Drake", "../img/drake-640.jfif")}
      //         {this.createSlide(
      //           "Childish Gambino",
      //           // "hip-hop",
      //           "../img/childish-gambino-640.jfif"
      //         )}
      //       </Slider>
      //     </Carousel>
      //   </Content>
      // </Main>
      <Carousel2>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </Carousel2>
    );
  }
}

export default Login;
