import React from "react";
import "../App.scss";
import { Howl, Howler } from "howler";
import Loading from "./Loading";
import {
  fetchRecommendations,
  likeTrack,
  convertGenreToProperNoun,
  fetchTrackPreview,
} from "../helper";

class Scout extends React.Component {
  constructor() {
    super();
    this.initialState = {
      loaded: false,
      recommendations: {},
      trackNum: 0,
      previousTrack: {},
      currentTrack: {},
      canDisplayNotification: true,
      displayNotification: false,
    };
    this.state = this.initialState;
    this.nextTrack = this.nextTrack.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }
  componentDidMount() {
    this.getRecommendations(this.getScoutType());
  }
  getScoutType() {
    console.log("MATCH", this.props.match);
    const regex = /genres|artists|tracks/gi;
    const url = this.props.match.url;
    return String(url.match(regex));
  }
  async getRecommendations(type) {
    try {
      console.log("Getting recommendations based on type = " + type);
      const json = await fetchRecommendations(type, this.props.match.params.id);
      console.log("GENRE RECOMMENDATIONS", json);
      this.setState({ recommendations: json.tracks, loaded: true }, () =>
        this.playTrack(0)
      );
    } catch (err) {
      console.log("ERROR FETCHING GENRE RECOMMENDATIONS,", err);
    }
  }
  async playTrack(i) {
    this.setState(
      {
        previousTrack: this.state.currentTrack,
        currentTrack: await this.getTrackHowl(i),
        loaded: true,
      },
      () => {
        const { previousTrack, currentTrack } = this.state;
        console.log(`currentTrack = `, currentTrack);
        const fadeDurationMilliseconds = 2500;
        const trackDurationSeconds = 30;
        console.log("i = " + i);
        // if (i !== 0) {
        //   console.log(`previousTrack = `, previousTrack);
        //   previousTrack.stop();
        // }
        if (i <= this.state.recommendations.length) {
          console.log(`TRYING TO PLAY SONG OF i = ${i}`);
          currentTrack.play();
          currentTrack.on("play", () => {
            currentTrack.fade(0, 1, fadeDurationMilliseconds);
            setTimeout(
              () => currentTrack.fade(1, 0, fadeDurationMilliseconds),
              (trackDurationSeconds - currentTrack.seek()) * 1000 -
                fadeDurationMilliseconds
            );
          });
        }
        currentTrack.on("end", () => {
          console.log("SONG ENDED");
          this.nextTrack();
        });
      }
    );
  }
  async getTrackHowl(i) {
    return new Howl({
      src: [await this.getTrackUrl(i)],
      html5: true,
      volume: 0,
    });
  }
  /*
   * This gets the full track object which is needed due to what is
   * (likely) a limitation with simplified track objects
   * which often return a null value for the preview_url key.
   * null gives us nothing to play back 😢
   */
  async getTrackUrl(i) {
    return await fetchTrackPreview(this.state.recommendations[i].id);
  }
  nextTrack() {
    this.state.currentTrack.stop();
    this.setState({ canDisplayNotification: true });
    if (this.state.trackNum < this.state.recommendations.length - 1) {
      this.setState(
        { trackNum: this.state.trackNum + 1, loaded: false },
        () => {
          console.log("trackNum = ", this.state.trackNum);
          this.playTrack(this.state.trackNum);
        }
      );
    } else {
      this.refreshTracks();
    }
  }
  refreshTracks() {
    console.log("REFRESHING NEW DATA");
    this.state.currentTrack.stop();
    this.setState(this.initialState, () =>
      this.getRecommendations(this.getScoutType())
    );
  }
  showNotification() {
    this.setState({ canDisplayNotification: false, displayNotification: true });
    setTimeout(() => {
      this.setState({ displayNotification: false });
    }, 1500);
  }
  renderScoutType() {
    const type = this.getScoutType();
    switch (type) {
      case "tracks":
        return (
          <React.Fragment>
            <h2>{this.props.location.trackName}</h2>
            <h4>{this.props.location.artistName}</h4>
          </React.Fragment>
        );
      case "artists":
        return <h2>{this.props.location.artistName}</h2>;
      case "genres":
        return <h2>{convertGenreToProperNoun(this.props.match.params.id)}</h2>;
      default:
        return <h1>Error loading Scout type</h1>;
    }
  }
  componentWillUnmount() {
    this.state.currentTrack.stop();
    this.setState(this.initialState);
  }
  render() {
    const {
      loaded,
      recommendations,
      trackNum,
      canDisplayNotification,
      displayNotification,
    } = this.state;
    const currentTrack = recommendations[trackNum];
    // const trackLikedStyle = {
    //   position: "absolute",
    //   display: "flex",
    //   "justify-content": "center",
    //   left: 0,
    //   // top: "10vh",
    //   top: "10vh",
    //   margin: 0,
    //   padding: 0,
    //   // left: "50%",
    //   // top: "50%",
    //   // transform: "translate(-50%, -50%)",
    //   "text-align": "center",
    //   width: "100%",
    //   height: "90vh",
    //   "background-color": "yellow",
    // };
    return (
      <div className="ScoutGenre">
        {displayNotification && (
          <div class="liked">
            <h2>like icon</h2>
            <h1>Added to your Liked Songs!</h1>
          </div>
        )}
        {loaded ? (
          <React.Fragment>
            <h3>Scouting based on</h3>
            {this.renderScoutType()}
            <img src={currentTrack.album.images[0].url} alt="album cover" />
            <h1>{currentTrack.name}</h1>
            <h4>{currentTrack.artists[0].name}</h4>
            <button onClick={this.nextTrack}>Next Track</button>
            <button
              onClick={() => {
                likeTrack(currentTrack.id);
                this.state.canDisplayNotification && this.showNotification();
                // this.nextTrack();
              }}
            >
              Like Track
            </button>
            <div id="track-progress" className="run-animation"></div>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default Scout;
