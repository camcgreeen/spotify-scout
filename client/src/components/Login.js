import React from "react";
import "../App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import theme from "../styles/theme";
import IconLogo from "./icons/IconLogo";
import IconInfo from "./icons/IconInfo";
import IconShare from "./icons/IconShare";
// import { ReactComponent as Logo } from "./icons/logo.svg";

const Logo = styled.div`
  width: 50px;
  /* height: 48px; */
  height: auto;
  fill: white;
  /* background-color: yellow; */
  /* margin-right: 40px; */
  transition: fill 0.25s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    fill: ${theme.colours.greenSpecial};
  }
`;

const NavIcon = styled.div`
  /* width: 32px;
  height: 32px; */
  width: 20px;
  height: 20px;
  /* margin: 0;
  padding: 0; */
  /* background-color: yellow; */
  fill: white;
  transition: fill 0.25s ease-in-out;
  &:hover,
  &:focus {
    cursor: pointer;
    fill: ${theme.colours.green};
  }
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isHovered: false,
    };
    this.handleHover = this.handleHover.bind(this);
  }
  handleHover() {
    console.log("HOVERED");
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered,
    }));
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
    const overlay = this.state.isHovered ? "--displayed" : "";
    return (
      <div className="Login">
        {
          //maybe import these svgs as there kinda annoying to just have in line?
        }
        <nav className="Login__nav">
          <button
            onClick={() => window.location.reload()}
            className="btn btn--nav btn--logo"
          >
            <Logo>
              <IconLogo />
            </Logo>
          </button>
          <NavIcon>
            <IconInfo />
          </NavIcon>
          {/* <IconInfo /> */}
          <NavIcon>
            <IconShare />
          </NavIcon>
        </nav>
        <div className="Login__container">
          <div className="Login__container__main">
            <div className="Login__container__main__section">
              <div className="Login__container__main__section__captions">
                <h1 className="Login__container__main__section__captions__h1">
                  Find music <span className="green">you love</span>.
                </h1>
                <h2 className="Login__container__main__section__captions__h2">
                  Explore new music easily and conveniently.
                </h2>
              </div>
              <div className="Login__container__main__section__login">
                <a href={"http://192.168.1.142:8888/login"}>
                  <button className="btn btn--login">
                    Log in with Spotify
                  </button>
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
              </div>
            </div>
            <Slider className="carousel" {...sliderSettings}>
              <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                <h4
                  className={"carousel__artist " + "carousel__artist" + overlay}
                >
                  Tame Impala
                </h4>
                <h4
                  className={"carousel__genre " + "carousel__genre" + overlay}
                >
                  neo-psychedelic
                </h4>
                <img src={"../img/tame-impala-640.jfif"} alt="" />
              </div>
              <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                <h4
                  className={"carousel__artist " + "carousel__artist" + overlay}
                >
                  The Weeknd
                </h4>
                <h4
                  className={"carousel__genre " + "carousel__genre" + overlay}
                >
                  contemporary r&b
                </h4>
                <img src={"../img/the-weeknd-640.jfif"} alt="" />
              </div>
              <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                <h4
                  className={"carousel__artist " + "carousel__artist" + overlay}
                >
                  Drake
                </h4>
                <h4
                  className={"carousel__genre " + "carousel__genre" + overlay}
                >
                  pop rap
                </h4>
                <img src={"../img/drake-640.jfif"} alt="" />
              </div>
              <div
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
              >
                <h4
                  className={"carousel__artist " + "carousel__artist" + overlay}
                >
                  Childish Gambino
                </h4>
                <h4
                  className={"carousel__genre " + "carousel__genre" + overlay}
                >
                  hip-hop
                </h4>
                <img src={"../img/childish-gambino-640.jfif"} alt="" />
              </div>
            </Slider>
            {/* <Slider
              className="Login__container__main__artist-carousel"
              {...sliderSettings}
            >
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
            </Slider> */}
            {/* <div className="Login__container__main__artist-carousel"></div> */}
            {/* <img src={"../img/tame-impala-640.jfif"} alt="" /> */}
            {/* <img src={"../img/drake-640.jfif"} alt="" /> */}
            {/* <div data-src={"../img/tame-impala-640.jfif"} />
              <div data-src={"../img/the-weeknd-640.jfif"} />
              <div data-src={"../img/drake-640.jfif"} />
              <div data-src={"../img/childish-gambino-640.jfif"} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
