import React from "react";
import "../App.css";
import { fetchTopTracks } from "../helper";

class Tracks extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      topTracks: {},
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    try {
      const json = await fetchTopTracks();
      console.log("TOP TRACKS, ", json);
      this.setState({ loaded: true, topTracks: json });
    } catch (err) {
      console.log("ERROR FETCHING TOP TRACKS", err);
    }
  }
  render() {
    const { loaded, topTracks } = this.state;
    return (
      <div className="Tracks">
        {loaded ? (
          <React.Fragment>
            <h1>Top Tracks</h1>
            <ul>
              {topTracks.items.map((track) => (
                <li>{`Track: ${track.name}, Artist: ${track.artists[0].name}`}</li>
              ))}
            </ul>
          </React.Fragment>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default Tracks;
