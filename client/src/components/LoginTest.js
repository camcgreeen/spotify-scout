import React from "react";
import "../App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Particles from "react-particles-js";
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

const StyledLogin = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: yellow; */
  display: flex;
  flex-flow: column;
  /* overflow: hidden; */
`;

const StyledParticles = styled.div`
  position: absolute;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0;
  padding: 0;
  /* background-color: red; */
  left: 0;
  top: 0;
  /* z-index: 10; */
  #tsparticles {
    .tsparticles-canvas-el {
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const LoginNav = styled.nav`
  position: relative;
  flex: 0 1 auto;
  /* left: 0;
  top: 0; */
  margin: 0;
  padding: 0;
  /* padding-top: 5px;
  padding-left: 5px; */
  /* padding-top: 25px; */
  /* width: 100%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* height: ${theme.navHeight}; */
  color: white;
  justify-content: flex-start;
  align-items: center;
  /* background-color: ${theme.colours.bgPopup}; */
  z-index: 1;
  height: 100px;
`;

const Logo = styled.div`
  width: 53px;
  height: auto;
  fill: white;
  margin-left: 25px;
  /* margin-right: 50px; */
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
  /* margin: 0;
  padding: 0; */
  width: 36px;
  height: 36px;
  color: white;
  /* margin-right: 25px; */
  /* background-color: yellow; */
  /* fill: white; */
  /* transition: fill 0.25s ease-in-out; */
  /* svg {
    &:hover,
    &:focus {
      cursor: pointer;
      fill: ${theme.colours.green};
    }
  } */
`;

const NavButton = styled.button`
  width: 36px;
  height: 36px;
  color: white;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  fill: white;
  transition: fill 0.25s ease-in-out;
    &:hover,
    &:focus {
      cursor: pointer;
      fill: ${theme.colours.green};
    }
  svg {
    /* transition: fill 0.25s ease-in-out;
    &:hover,
    &:focus {
      cursor: pointer;
      fill: ${theme.colours.green};
    } */
  }
`;

const PopupAbout = styled.div`
  width: 35vw;
  /* height: 30vw; */
  margin: 20px 0px 0px 0px;
  /* margin-top: -200px; */
  padding: 40px;
  text-align: left;
  background-color: ${theme.colours.bgPopup};
  border-radius: 2vw;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  z-index: 2;
  h2 {
    margin: 0 0 20px 0;
    padding: 0;
  }
  p {
    margin: 20px 0;
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
  display: none;
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
  border-radius: 2vw;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  z-index: 2;
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
  display: none;
  /* opacity: 0; */
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  &.visible {
    display: block;
    opacity: 1;
  }
`;

const MainWrapper = styled.div`
  /* height: calc(100vh - ${theme.navHeight}); */
  /* width: 100%; */
  /* height: 100%; */
  /* display: flex;
  flex-flow: column; */
  margin: 0;
  padding: 0;
  position: relative;
  flex: 1 1 auto;
  /* position: absolute;
  left: 0;
  bottom: 0;
  flex: 1; */
  margin: 0;
  padding: 0;
  /* background-color: pink; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
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
  /* background-color: yellow; */
  div {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    margin: 0;
    padding: 0;
    img {
      position: absolute;
      /* left: 50%; */
      left: 0;
      top: 50%;
      /* transform: translate(-50%, -50%); */
      transform: translateY(-50%);
      object-fit: cover;
      /* width: 100%; */
      width: 46%;
      height: 100%;
      /* transition: 0.3s ease-in-out; */
      &:hover {
        width: 110%;
        height: 110%;
      }
    }
    &.info {
      position: absolute;
      /* left: 50%; */
      right: 0;
      bottom: 0;
      /* transform: translate(-50%, -50%); */
      /* transform: translateY(-50%); */
      width: 40%;
      height: 50%;
      /* background-color: blue; */
      background-color: ${theme.colours.bgPopup};
      border-radius: 0;
      text-align: left;
      padding: 20px;
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start; */
      h2 {
        font-size: 12px;
        margin: 0;
        padding: 0;
      }
      h3 {
        position: relative;
        margin: 0;
        padding: 0;
        /* margin: 0;
        padding */
      }
      img {
        position: relative;
        width: 80px;
        height: 80px;
        margin: 0;
        padding: 0;
      }
      /* border-top-right-radius: 40px;
      border-bottom-right-radius: 40px; */
    }
    &.info2 {
      position: absolute;
      /* left: 50%; */
      right: 100px;
      top: 10px;
      /* transform: translate(-50%, -50%); */
      /* transform: translateY(-50%); */
      width: 25%;
      height: 24%;
      /* background-color: red; */
      background-color: ${theme.colours.bgPopup};
      border-radius: 0;
      text-align: left;
      padding: 20px;
      z-index: 10;
      /* border-top-right-radius: 25px;
      border-bottom-right-radius: 25px; */
      border-radius: 25px;
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start; */
      h2 {
        font-size: 12px;
        margin: 0;
        padding: 0;
      }
      h3 {
        position: relative;
        margin: 0;
        padding: 0;
        /* margin: 0;
        padding */
      }
      img {
        position: relative;
        width: 80px;
        height: 80px;
        margin: 0;
        padding: 0;
      }
      /* border-top-right-radius: 40px;
      border-bottom-right-radius: 40px; */
    }
  }
  h3 {
    /* position: absolute;
    margin: 0;
    padding: 20px;
    bottom: 0;
    left: 50%;
    transform: translate((-50%, 0%));
    font-size: 24px;
    background-color: #181818;
    z-index: 10; */
  }
  /* &.info {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    background-color: yellow;
  } */
  h4 {
    position: absolute;
    margin: 0;
    padding: 20px;
    /* left: 50%; */
    /* transform: translateX(-50%); */
    font-weight: 400;
    background-color: #181818;
    z-index: 1;
    /* transition: 0.25s ease-in-out; */
    /* &.artist {
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
    } */
    &.artist {
      font-size: 18px;
      /* border-top-left-radius: 40px;
      border-top-right-radius: 40px; */
      top: 50%;
      left: 75%;
      transform: translate(-50%, -50%);
      opacity: 1;
      z-index: 20;
    }
    &.artist-name {
      left: 50%;
      opacity: 0;
      font-size: 14px;
      top: -15%;
      transform: translate(-50%, 0);
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
      &--visible {
        top: 0;
        opacity: 0;
      }
    }
    &.popularity {
      /* width: 100px;
      height: 100px; */
      background-color: red;
      color: white;
      position: absolute;
      top: 100px;
      right: 0;
      z-index: 10;
    }
  }
  .slick-dots {
    /* width: 50%; */
    /* margin-left: 200px; */
    /* transform: translateX(50%); */
    /* background-color: yellow; */
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
  createSlide(artistName, imageSrc) {
    const overlayCarousel = this.state.carouselHovered ? "--visible" : "";
    return (
      <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        {/* <h4 className={"artist " + "artist" + overlayCarousel}>{artistName}</h4> */}
        {/* <div className="info">
          <h4 className="artist">Popularity</h4>
          <h4 className="popularity">Popularity</h4>
        </div> */}
        <h4 className={"artist-name " + "artist-name" + overlayCarousel}>
          {artistName}
          {/* <br />
          {"⭐ Well Known"} */}
        </h4>
        <img src={imageSrc} alt="" />
        <div className="info2">
          <h2>Popularity</h2>
          <h3>🚀 Trending</h3>
        </div>
        <div className="info">
          <h3>Top Track</h3>
          <img src="../img/top-track-tame-impala.jfif" alt="" />
        </div>
      </div>
    );
  }
  render() {
    const sliderSettings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      draggable: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: "ease-in-out",
    };
    let overlayAbout = this.state.showPopupAbout
      ? "popup-about visible"
      : "popup-about";
    let overlayShare = this.state.showPopupShare
      ? "popup-share visible"
      : "popup-share";
    console.log(overlayAbout);
    const params = {
      particles: {
        number: {
          value: 10,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: "#000000",
        },
        shape: {
          type: "polygon",
          stroke: {
            width: 2,
            color: "#444",
          },
          polygon: {
            nb_sides: 3,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 5000,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 200,
          color: "#ffffff",
          opacity: 0.05,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.75,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 9049.773755656108,
            rotateY: 7848.476354462819,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 7,
            duration: 2,
            opacity: 0.25,
            speed: 3,
          },
          repulse: {
            distance: 25,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    };
    const divStyle = {
      overflow: "hidden",
    };
    return (
      <StyledLogin>
        {/* <DotGrid
          spacing={800}
          numRows={7}
          numDotsPerRow={8}
          minRadius={Math.max(Math.floor(800 * Math.random()), 300)}
        /> */}
        <StyledParticles>
          <Particles params={{ ...params }} />
        </StyledParticles>
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
        <MainWrapper className="here">
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
              <a href={"http://192.168.1.143:8888/login"}>
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
                  // "neo-psychedlic",
                  "../img/tame-impala-640.jfif"
                )}
                {this.createSlide(
                  "The Weeknd",
                  // "contemporary r&b",
                  "../img/the-weeknd-640.jfif"
                )}
                {this.createSlide("Drake", "../img/drake-640.jfif")}
                {this.createSlide(
                  "Childish Gambino",
                  // "hip-hop",
                  "../img/childish-gambino-640.jfif"
                )}
              </Slider>
            </Carousel>
          </MainGrid>
        </MainWrapper>
      </StyledLogin>
    );
  }
}

export default Login;
