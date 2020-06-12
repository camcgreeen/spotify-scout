import React from "react";
import "../App.css";
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
    this.state = {
      loaded: false,
      recommendations: {},
      previews: [],
      trackNum: 0,
    };
    this.nextTrack = this.nextTrack.bind(this);
  }
  componentDidMount() {
    this.getTracks();
    // need to reset trackNum to 0 for new component loading
    this.setState({ trackNum: 0 });
  }
  async getTracks() {
    try {
      const json = await fetchRecommendations(
        "genres",
        this.props.match.params.id
      );
      console.log("GENRE RECOMMENDATIONS", json);

      // have to do this because the simplified track
      // object often returns null from preview_url key
      this.setState({ recommendations: json.tracks }, () =>
        this.setTrackPreviews()
      );
    } catch (err) {
      console.log("ERROR FETCHING GENRE RECOMMENDATIONS,", err);
    }
  }
  async setTrackPreviews() {
    for (let i = 0; i < this.state.recommendations.length; i++) {
      let trackPreview = await getTrackPreview(
        this.state.recommendations[i].id
      );
      this.setState((prevState) => ({
        previews: [...prevState.previews, trackPreview],
        loaded: true,
      }));
    }
  }
  refreshTracks() {
    console.log("REFRESHING NEW DATA");
    this.setState({ loaded: false, trackNum: 0, previews: [] });
    this.getTracks();
  }
  nextTrack() {
    if (this.state.trackNum < this.state.recommendations.length - 1) {
      this.setState({ trackNum: this.state.trackNum + 1 }, () =>
        console.log("trackNum = ", this.state.trackNum)
      );
    } else {
      this.refreshTracks();
    }
  }
  render() {
    const { loaded, recommendations, trackNum, previews } = this.state;
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
            <button onClick={this.nextTrack}>Next Track</button>
            <button
              onClick={() => {
                likeTrack(currentTrack.id);
                this.nextTrack();
              }}
            >
              Like Track
            </button>
            <h2>Testing some audio</h2>
            <audio controls>
              <source src={previews[0]} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <h3>{previews[trackNum]}</h3>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default ScoutGenre;
