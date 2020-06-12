import React from "react";
import "../App.css";
import { fetchRecommendations } from "../helper";

class ScoutGenre extends React.Component {
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
        "genres",
        this.props.match.params.id
      );
      console.log("GENRE RECOMMENDATIONS", json);
      this.setState({ loaded: true, recommendations: json });
    } catch (err) {
      console.log("ERROR FETCHING GENRE RECOMMENDATIONS,", err);
    }
  }

  render() {
    const { loaded, recommendations } = this.state;
    return (
      <div className="ScoutGenre">
        {loaded ? (
          <React.Fragment>
            <h1>Scouting based on genre: {this.props.match.params.id}</h1>
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

export default ScoutGenre;
