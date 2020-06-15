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
      trackUrls: [],
      trackList: [],
    };
    this.state = this.initialState;
    this.nextTrack = this.nextTrack.bind(this);
  }
  async getRecommendations() {
    try {
      const json = await fetchRecommendations(
        "genres",
        this.props.match.params.id
      );
      console.log("GENRE RECOMMENDATIONS", json);

      // have to do this because the simplified track
      // object often returns null from preview_url key
      this.setState({ recommendations: json.tracks }, () =>
        this.setTrackUrls()
      );
    } catch (err) {
      console.log("ERROR FETCHING GENRE RECOMMENDATIONS,", err);
    }
  }
  async setTrackUrls() {
    let tmp = [];
    for (let i = 0; i < this.state.recommendations.length; i++) {
      let trackPreview = await getTrackPreview(
        this.state.recommendations[i].id
      );
      tmp.push(trackPreview);
    }
    this.setState({ trackUrls: [...tmp], loaded: true }, () =>
      // this.playTrack(this.state.trackUrls[0])
      this.setTrackList()
    );
  }
  getTrackHowl(url) {
    // console.log(`adding ${url} to trackList`);
    return new Howl({
      src: [url],
      html5: true,
      volume: 0.1,
    });
    // this.setState({ trackList: [...this.state.trackList, track] });
  }
  setTrackList() {
    let tmp = [];
    for (let i = 0; i < this.state.trackUrls.length; i++) {
      tmp.push(this.getTrackHowl(this.state.trackUrls[i]));
      // get track Howl object
      // push it on
    }
    this.setState({ trackList: [...tmp] }, () => {
      // get things started by playing the first track by default
      this.playTrack(0);
      // console.log("TRACK LIST: ", this.state.trackList);
    });
  }
  componentDidMount() {
    this.getRecommendations();
    // need to reset trackNum to 0 for new component loading
    this.setState({ trackNum: 0 });
  }
  componentWillUnmount() {
    this.state.trackList[this.state.trackNum].stop();
    this.setState(this.initialState);
  }
  refreshTracks() {
    console.log("REFRESHING NEW DATA");
    // this.setState({
    //   loaded: false,
    //   recommendations: {},
    //   trackNum: 0,
    //   trackUrls: [],
    //   trackList: [],
    // });
    this.state.trackList[this.state.trackNum].stop();
    this.setState(this.initialState, () => this.getRecommendations());
    // this.getRecommendations();
  }
  nextTrack() {
    if (this.state.trackNum < this.state.recommendations.length - 1) {
      this.setState({ trackNum: this.state.trackNum + 1 }, () => {
        console.log("trackNum = ", this.state.trackNum);
        this.playTrack(this.state.trackNum);
        // this.playTrack(this.state.trackUrls[this.state.trackNum]);
      });
    } else {
      this.refreshTracks();
    }
  }
  playTrack(i) {
    // console.log("LOADING TRACK...");
    // let track = new Howl({
    //   src: [url],
    //   html5: true,
    //   volume: 0.1,
    // });
    // console.log("HOWL = ", track);
    // console.log(`TRYING TO PLAY SONG OF URL = ${url}`);
    // track.play();
    console.log("i = " + i);
    if (i !== 0) {
      this.state.trackList[i - 1].stop();
    }
    if (i <= this.state.trackList.length) {
      console.log(`TRYING TO PLAY SONG OF i = ${i}`);
      this.state.trackList[i].play();
    }

    this.state.trackList[i].on("end", () => {
      console.log("SONG ENDED");
      this.nextTrack();
    });
  }
  render() {
    const { loaded, recommendations, trackNum, trackUrls } = this.state;
    // why does const work -> is a new "version" of currentTrack
    // created every time state is updated?
    const currentTrack = recommendations[trackNum];
    return (
      <div className="ScoutGenre">
        {loaded ? (
          <React.Fragment>
            <h3>Scouting based on</h3>
            <h2>{convertGenreToProperNoun(this.props.match.params.id)}</h2>
            <img src={currentTrack.album.images[0].url} alt="album cover" />
            <h1>{currentTrack.name}</h1>
            <h4>{currentTrack.artists[0].name}</h4>
            <button
              onClick={() => {
                this.nextTrack();
                // this.playTrack(trackNum + 1);
              }}
            >
              Next Track
            </button>
            <button
              onClick={() => {
                likeTrack(currentTrack.id);
                this.nextTrack();
                // this.playTrack(trackNum + 1);
              }}
            >
              Like Track
            </button>
            <h2>Testing some audio</h2>
            <audio controls>
              <source src={trackUrls[0]} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <h3>{trackUrls[trackNum]}</h3>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default ScoutGenre;
