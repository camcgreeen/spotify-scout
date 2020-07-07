import React from "react";
import "../App.scss";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { fetchTopTracks } from "../helper";

class Tracks extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      topTracks: {},
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    try {
      const json = await fetchTopTracks();
      console.log("TOP TRACKS, ", json);
      this.setState({ loaded: true, topTracks: json, filtered: json.items });
    } catch (err) {
      console.log("ERROR FETCHING TOP TRACKS", err);
    }
  }
  handleChange(e) {
    try {
      const regex = new RegExp(e.target.value, "gi");
      const filtered = this.state.topTracks.items.filter((track) =>
        regex.test(track.name)
      );
      this.setState({ filtered });
    } catch (err) {
      console.log("Error with regular expression:", err);
    }
  }
  render() {
    const { loaded, filtered } = this.state;
    return (
      <div className="Tracks">
        {loaded ? (
          <React.Fragment>
            <h1>Top Tracks</h1>
            <input
              type="text"
              placeholder="Search.."
              onChange={this.handleChange}
            />
            <ul>
              {filtered.map((track) => (
                <li>
                  <Link
                    to={{
                      pathname: `/scout/tracks/${track.id}`,
                      trackName: track.name,
                      artistName: track.artists[0].name,
                    }}
                  >{`${track.name}, ${track.artists[0].name}`}</Link>
                </li>
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

export default Tracks;
