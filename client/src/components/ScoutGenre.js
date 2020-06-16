import React from "react";
import "../App.css";
import { Howl, Howler } from "howler";
import Loading from "./Loading";
import {
  fetchRecommendations,
  likeTrack,
  convertGenreToProperNoun,
  getTrackPreview,
} from "../helper";

class ScoutGenre extends React.Component {
  constructor() {
    super();
    this.initialState = {
      loaded: false,
      recommendations: {},
      trackNum: 0,
      previousTrack: {},
      currentTrack: {},
      notify: false,
    };
    this.state = this.initialState;
    this.nextTrack = this.nextTrack.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }
  componentDidMount() {
    this.getRecommendations();
  }
  async getRecommendations() {
    try {
      const json = await fetchRecommendations(
        "genres",
        this.props.match.params.id
      );
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
      },
      () => {
        const { previousTrack, currentTrack } = this.state;
        console.log(`currentTrack = `, currentTrack);
        const fadeDurationMilliseconds = 5000;
        const trackDurationSeconds = 30;
        console.log("i = " + i);
        if (i !== 0) {
          console.log(`previousTrack = `, previousTrack);
          previousTrack.stop();
        }
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
    return await getTrackPreview(this.state.recommendations[i].id);
  }
  nextTrack() {
    if (this.state.trackNum < this.state.recommendations.length - 1) {
      this.setState({ trackNum: this.state.trackNum + 1 }, () => {
        console.log("trackNum = ", this.state.trackNum);
        this.playTrack(this.state.trackNum);
      });
    } else {
      this.refreshTracks();
    }
  }
  refreshTracks() {
    console.log("REFRESHING NEW DATA");
    this.state.currentTrack.stop();
    this.setState(this.initialState, () => this.getRecommendations());
  }
  showNotification() {
    this.setState({ notify: true });
    setTimeout(() => {
      this.setState({ notify: false });
    }, 2000);
  }
  componentWillUnmount() {
    this.state.currentTrack.stop();
    this.setState(this.initialState);
  }
  render() {
    const { loaded, recommendations, trackNum, notify } = this.state;
    const currentTrack = recommendations[trackNum];
    const trackLikedStyle = {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    };
    return (
      <div className="ScoutGenre">
        {loaded ? (
          <React.Fragment>
            <h3>Scouting based on</h3>
            <h2>{convertGenreToProperNoun(this.props.match.params.id)}</h2>
            <img src={currentTrack.album.images[0].url} alt="album cover" />
            <h1>{currentTrack.name}</h1>
            <h4>{currentTrack.artists[0].name}</h4>
            <button onClick={this.nextTrack}>Next Track</button>
            <button
              onClick={() => {
                likeTrack(currentTrack.id);
                this.showNotification();
                this.nextTrack();
              }}
            >
              Like Track
            </button>
            {notify && (
              <h1 style={trackLikedStyle}>Added to your Liked Songs!</h1>
            )}
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default ScoutGenre;
