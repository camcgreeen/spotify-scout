import React from "react";
import "../App.scss";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { fetchTopArtists } from "../helper";

class Artists extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      topArtists: {},
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    try {
      const json = await fetchTopArtists();
      this.setState({ loaded: true, topArtists: json, filtered: json.items });
    } catch (err) {
      console.log("ERROR FETCHING TOP ARTISTS,", err);
    }
  }
  handleChange(e) {
    try {
      const regex = new RegExp(e.target.value, "gi");
      const filtered = this.state.topArtists.items.filter((artist) =>
        regex.test(artist.name)
      );
      this.setState({ filtered });
    } catch (err) {
      console.log("Error with regular expression:", err);
    }
  }
  render() {
    const { loaded, filtered } = this.state;
    return (
      <div className="Artists">
        {loaded ? (
          <React.Fragment>
            <h1>Top Artists</h1>
            <input
              type="text"
              placeholder="Search.."
              onChange={this.handleChange}
            />
            <ul>
              {filtered.map((artist) => (
                <li>
                  <Link
                    to={{
                      pathname: `/scout/artists/${artist.id}`,
                      artistName: artist.name,
                    }}
                  >
                    {artist.name}
                  </Link>
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

export default Artists;
