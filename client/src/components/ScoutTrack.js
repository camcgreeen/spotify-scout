import React from "react";
import "../App.css";
import Loading from "./Loading";
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
      this.setState({ loaded: true, recommendations: json.tracks });
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
              {recommendations.map((track) => (
                <li>{`${track.name}, ${track.artists[0].name}`}</li>
              ))}
            </ul>
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default ScoutTrack;
