import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { genres, convertGenreToProperNoun } from "../helper";

class Genres extends React.Component {
  constructor() {
    super();

    this.state = {
      genres,
      filtered: genres,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    try {
      const regex = new RegExp(e.target.value, "gi");
      const filtered = this.state.genres.filter((genre) => regex.test(genre));
      this.setState({ filtered });
    } catch (err) {
      console.log("Error with regular expression:", err);
    }
  }
  render() {
    const { filtered } = this.state;
    return (
      <div className="Genres">
        <input
          type="text"
          placeholder="Search.."
          onChange={this.handleChange}
        />
        <ul>
          {filtered.map((genre) => (
            <Link to={`/scout/genre/${genre}`}>
              <li>{convertGenreToProperNoun(genre)}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default Genres;
