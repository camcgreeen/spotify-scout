import React from "react";
import "../App.css";
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
      this.setState({ loaded: true, recommendations: json });
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

export default ScoutArtist;
