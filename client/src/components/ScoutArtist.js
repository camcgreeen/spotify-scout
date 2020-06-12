import React from "react";
import "../App.css";
import Loading from "./Loading";
import { fetchRecommendations } from "../helper";

class ScoutArtist extends React.Component {
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
        "artists",
        this.props.match.params.id
      );
      console.log("ARTIST RECOMMENDATIONS", json);
      this.setState({ loaded: true, recommendations: json.tracks });
    } catch (err) {
      console.log("ERROR FETCHING ARTIST RECOMMENDATIONS,", err);
    }
  }

  render() {
    const { loaded, recommendations } = this.state;
    return (
      <div className="ScoutArtist">
        {loaded ? (
          <React.Fragment>
            <h1>Scouting based on artist: {this.props.match.params.id}</h1>
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

export default ScoutArtist;
