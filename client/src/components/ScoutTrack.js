import React from "react";
import "../App.css";
import { fetchRecommendations } from "../helper";

class ScoutTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      recommendations: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const json = await fetchRecommendations(
        "tracks",
        this.props.match.params.id
      );
      console.log("TRACK RECOMMENDATIONS", json);
      this.setState({ loaded: true, recommendations: json });
    } catch (err) {
      console.log("ERROR FETCHING TRACK RECOMMENDATIONS,", err);
    }
  }

  render() {
    const { loaded, recommendations } = this.state;
    return (
      <div className="ScoutTrack">
        {loaded ? (
          <React.Fragment>
            <h1>Scouting based on track: {this.props.match.params.id}</h1>
            <ul>
              {recommendations.tracks.map((track) => (
                <li>{`${track.name}, ${track.artists[0].name}`}</li>
              ))}
            </ul>
          </React.Fragment>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    );
  }
}

export default ScoutTrack;
