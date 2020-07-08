import React from "react";
import "../App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import theme from "../styles/theme";
// WHY WAS DESTRUCTURED IMPORT NOT WORKING?
import IconLogo from "./icons/IconLogo";
import IconAbout from "./icons/IconAbout";
import IconShare from "./icons/IconShare";
import IconGithub from "./icons/IconGithub";
import IconFacebook from "./icons/IconFacebook";
import IconTwitter from "./icons/IconTwitter";
import IconLinkedin from "./icons/IconLinkedin";

const LoginNav = styled.nav`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${theme.navHeight};
  color: white;
  justify-content: flex-start;
  align-items: center;
  /* background-color: green; */
  z-index: 1;
`;

const Logo = styled.div`
  width: 60px;
  height: auto;
  fill: white;
  /* background-color: yellow; */
  transition: fill 0.25s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    fill: ${theme.colours.greenSpecial};
  }
`;

// const NavElement

const NavElement = styled.div`
  width: 24px;
  height: 24px;
  color: white;
  /* background-color: yellow; */
  fill: white;
  transition: fill 0.25s ease-in-out;
  /* svg {
    &:hover,
    &:focus {
      cursor: pointer;
      fill: ${theme.colours.green};
    }
  } */
`;

const NavButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  svg {
    &:hover,
    &:focus {
      cursor: pointer;
      fill: ${theme.colours.green};
    }
  }
`;

const PopupAbout = styled.div`
  width: 40vw;
  /* height: 30vw; */
  margin: 10px 0px 0px 0px;
  /* margin-top: -200px; */
  padding: 40px;
  text-align: left;
  background-color: ${theme.colours.bgPopup};
  border-radius: 5%;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  h2 {
    margin: 0;
    padding: 0;
  }
  a {
    color: white;
    &:active,
    &:visited {
      color: grey;
    }
  }
  div {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    h3 {
      margin-left: 20px;
      padding: 0;
    }
    a {
      /* color: white; */
      &:active,
      &:visited {
        color: grey;
      }
    }
  }
  display: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  &.visible {
    display: block;
    opacity: 1;
  }
`;

const PopupShare = styled.div`
  /* width: 20vw; */
  /* width: 225px; */
  width: 225px;
  /* height: 30vw; */
  margin: 10px 0px 0px 0px;
  /* margin-top: -200px; */
  padding: 40px;
  text-align: left;
  background-color: ${theme.colours.bgPopup};
  border-radius: 5%;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  h2,
  p {
    margin: 0px 0px 30px 0px;
    padding: 0;
    /* background-color: blue; */
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* background-color: yellow; */
    margin: 0;
    padding: 0;
    svg {
      margin-right: 30px;
    }
    overflow: hidden;
  }
  display: hidden;
  /* opacity: 0; */
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  &.visible {
    display: block;
    opacity: 1;
  }
`;

const MainWrapper = styled.div`
  height: calc(100vh - ${theme.navHeight});
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  flex: 1;
  margin: 0;
  padding: 0;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainGrid = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 90vw;
  height: 90%;
  /* background-color: orange; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr 1fr;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr 1fr 1fr;
  }
`;

const Captions = styled.div`
  margin: auto auto;
  /* background: red; */
  h1 {
    font-size: 54px;
    margin-bottom: 8px;
  }
  h2 {
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    margin: 0;
    padding: 0;
  }

  @media screen and (max-width: 600px) {
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

const LoginSection = styled.div`
  margin: auto auto;
  /* background: green; */
  a {
    display: inline-block;
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  h3 {
    font-weight: normal;
    font-style: normal;
    font-size: 12px;
    opacity: 0.5;
    margin: 8px;
    padding: 0;
  }
  @media screen and (max-width: 600px) {
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

const LoginButton = styled.button`
  border: none;
  background: none;
  margin: 0;
  font-family: "Circular Std Book", "sans-serif";
  font-size: 20px;
  background-color: #1db954;
  font-weight: 400;
  color: white;
  border-radius: 40px;
  padding: 22px 38px;
  text-decoration: none;
  transition: 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    padding: 22px 44px;
    background-color: #1ed760;
  }
`;

const Carousel = styled.div`
  /* background: blue; */
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
  width: 400px;
  height: 400px;
  margin: auto auto;
  padding: 15px;
  div {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    margin: 0;
    padding: 0;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: 0.3s ease-in-out;
      &:hover {
        width: 110%;
        height: 110%;
      }
    }
  }
  h3 {
    position: absolute;
    margin: 0;
    padding: 20px;
    bottom: 0;
    left: 50%;
    transform: translate((-50%, 0%));
    font-size: 24px;
    background-color: #181818;
    z-index: 10;
  }
  h4 {
    position: absolute;
    margin: 0;
    padding: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
    background-color: #181818;
    z-index: 1;
    transition: 0.25s ease-in-out;
    &.artist {
      opacity: 0;
      font-size: 18px;
      bottom: -15%;
      transform: translate((-50%, 0%));
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      &--visible {
        bottom: 0;
        opacity: 1;
      }
    }
    &.genre {
      opacity: 0;
      font-size: 14px;
      top: -15%;
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      &--visible {
        top: 0;
        opacity: 1;
      }
    }
  }
  .slick-dots li {
    button::before {
      margin-top: 20px !important;
      color: #fff !important;
      opacity: 0.5 !important;
      transition: 0.3s ease-in-out;
    }
    &.slick-active button::before {
      font-size: 18px;
      color: #1db954 !important;
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

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      carouselHovered: false,
      showPopupAbout: false,
      showPopupShare: false,
    };
    this.handleHover = this.handleHover.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }
  componentDidMount() {
    window.addEventListener("click", (e) => {
      console.log(e);
      const popupAbout = document.querySelector(".popup-about");
      const popupShare = document.querySelector(".popup-share");
      const iconAbout = document.getElementById("icon-about");
      const iconShare = document.getElementById("icon-share");
      const hidePopupAboutClickArea =
        !popupAbout.contains(e.target) &&
        !iconAbout.contains(e.target) &&
        this.state.showPopupAbout;
      const hidePopupShareClickArea =
        !popupShare.contains(e.target) &&
        !iconShare.contains(e.target) &&
        this.state.showPopupShare;
      if (hidePopupAboutClickArea) {
        this.showPopup("about");
      }
      if (hidePopupShareClickArea) {
        this.showPopup("share");
      }
    });
  }
  showPopup(popup) {
    switch (popup) {
      case "about":
        this.closePopup("share");
        this.setState((prevState) => ({
          showPopupAbout: !prevState.showPopupAbout,
        }));
        break;
      case "share":
        this.closePopup("about");
        this.setState((prevState) => ({
          showPopupShare: !prevState.showPopupShare,
        }));
        break;
      default:
        console.log("Error occurred with button press");
    }
  }
  closePopup(popup) {
    switch (popup) {
      case "about":
        this.setState({ showPopupAbout: false });
        break;
      case "share":
        this.setState({ showPopupShare: false });
    }
  }
  handleHover() {
    this.setState((prevState) => ({
      carouselHovered: !prevState.carouselHovered,
    }));
  }
  createSlide(artistName, genre, imageSrc) {
    const overlayCarousel = this.state.carouselHovered ? "--visible" : "";
    return (
      <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <h4 className={"artist " + "artist" + overlayCarousel}>{artistName}</h4>
        <h4 className={"genre " + "genre" + overlayCarousel}>{genre}</h4>
        <img src={imageSrc} alt="" />
      </div>
    );
  }
  render() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      // autoplay: true,
      autoplaySpeed: 3500,
      arrows: false,
      draggable: true,
      speed: 1250,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    let overlayAbout = this.state.showPopupAbout
      ? "popup-about visible"
      : "popup-about";
    let overlayShare = this.state.showPopupShare
      ? "popup-share visible"
      : "popup-share";
    console.log(overlayAbout);
    return (
      <React.Fragment>
        <LoginNav>
          <button
            onClick={() => window.location.reload()}
            className="btn btn--nav btn--logo"
          >
            <Logo>
              <IconLogo />
            </Logo>
          </button>
          <NavElement>
            <NavButton id="icon-about" onClick={() => this.showPopup("about")}>
              <IconAbout />
            </NavButton>
            <PopupAbout className={overlayAbout}>
              <h2>About</h2>
              <p>
                Scout provides an easy way to discover new music that suits your
                tastes. Built with{" "}
                <a
                  href="https://developer.spotify.com/documentation/web-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify's Web API
                </a>
                .
              </p>
              <p>
                Scout needs access to your Spotify account in order to serve
                recommendations. None of your Spotify data will be stored on any
                server.
              </p>
              <div>
                <a
                  href="https://github.com/camcgreen/spotify-scout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGithub width="40px" fill="#FFF" />
                </a>
                <h3>
                  View source on{" "}
                  <a
                    href="https://github.com/camcgreen/spotify-scout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{ color: theme.colours.greenSpecial }}>
                      GitHub
                    </span>
                  </a>
                </h3>
              </div>
            </PopupAbout>
          </NavElement>
          <NavElement>
            <NavButton id="icon-share" onClick={() => this.showPopup("share")}>
              <IconShare />
            </NavButton>
            <PopupShare className={overlayShare}>
              <h2>Share</h2>
              <p>Let the world know.</p>
              <div>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconFacebook width="50px" fill="#FFF" />
                </a>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconTwitter width="50px" fill="#FFF" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconLinkedin width="50px" fill="#FFF" />
                </a>
              </div>
            </PopupShare>
          </NavElement>
        </LoginNav>
        <MainWrapper>
          <MainGrid>
            <Captions>
              <h1>
                Find music{" "}
                <span style={{ color: theme.colours.greenSpecial }}>
                  you love
                </span>
                .
              </h1>
              <h2>Explore new music easily and conveniently.</h2>
            </Captions>
            <LoginSection>
              <a href={"http://192.168.1.142:8888/login"}>
                {/* <button className="btn btn--login">Log in with Spotify</button> */}
                <LoginButton>Log in with Spotify</LoginButton>
              </a>
              <br />
              <a
                href={"https://www.spotify.com/signup/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="Login__container__main__section__login__no-account">
                  Don't have a Spotify account?
                </h3>
              </a>
            </LoginSection>
            <Carousel>
              <Slider {...sliderSettings}>
                {this.createSlide(
                  "Tame Impala",
                  "neo-psychedlic",
                  "../img/tame-impala-640.jfif"
                )}
                {this.createSlide(
                  "The Weeknd",
                  "contemporary r&b",
                  "../img/the-weeknd-640.jfif"
                )}
                {this.createSlide("Drake", "pop rap", "../img/drake-640.jfif")}
                {this.createSlide(
                  "Childish Gambino",
                  "hip-hop",
                  "../img/childish-gambino-640.jfif"
                )}
              </Slider>
            </Carousel>
          </MainGrid>
        </MainWrapper>
      </React.Fragment>
    );
  }
}

export default Login;
