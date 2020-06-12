import React from "react";
import "../App.css";
import Loading from "./Loading";
import {
  fetchRecommendations,
  likeTrack,
  convertGenreToProperNoun,
} from "../helper";

class ScoutGenre extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      recommendations: {},
      trackNum: 0,
    };
    this.nextTrack = this.nextTrack.bind(this);
  }

  componentDidMount() {
    this.getData();
    // need to reset trackNum to 0 for new component loading
    this.setState({ trackNum: 0 });
  }

  async getData() {
    try {
      const json = await fetchRecommendations(
        "genres",
        this.props.match.params.id
      );
      console.log("GENRE RECOMMENDATIONS", json);
      this.setState({ loaded: true, recommendations: json.tracks });
    } catch (err) {
      console.log("ERROR FETCHING GENRE RECOMMENDATIONS,", err);
    }
  }

  nextTrack() {
    if (this.state.trackNum < this.state.recommendations.length - 1) {
      this.setState({ trackNum: this.state.trackNum + 1 }, () =>
        console.log("trackNum = ", this.state.trackNum)
      );
    } else {
      console.log("RELOADING NEW DATA");
      this.setState({ loaded: false, trackNum: 0 });
      this.getData();
    }
  }

  render() {
    const { loaded, recommendations, trackNum } = this.state;
    return (
      <div className="ScoutGenre">
        {loaded ? (
          <React.Fragment>
            <h3>Scouting based on</h3>
            <h2>{convertGenreToProperNoun(this.props.match.params.id)}</h2>
            <img
              src={recommendations[trackNum].album.images[0].url}
              alt="album cover"
            />
            <h1>{recommendations[trackNum].name}</h1>
            <h4>{recommendations[trackNum].artists[0].name}</h4>
            <button onClick={this.nextTrack}>Next Track</button>
            <button
              onClick={() => {
                likeTrack(recommendations[trackNum].id);
                this.nextTrack();
              }}
            >
              Like Track
            </button>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default ScoutGenre;
