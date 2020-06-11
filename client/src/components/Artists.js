import React from "react";
import "../App.css";
import { fetchTopArtists } from "../helper";

class Artists extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      topArtists: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const json = await fetchTopArtists();
      this.setState({ loaded: true, topArtists: json });
    } catch (err) {
      console.log("ERROR FETCHING TOP ARTISTS,", err);
    }
  }

  render() {
    const { loaded, topArtists } = this.state;
    return (
      <div className="Artists">
        {loaded ? (
          <React.Fragment>
            <ul>
              {topArtists.items.map((artist) => (
                <li>{artist.name}</li>
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

export default Artists;
