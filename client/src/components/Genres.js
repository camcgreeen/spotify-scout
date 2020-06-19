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
    this.myFunction = this.myFunction.bind(this);
  }
  handleChange(e) {
    const regex = new RegExp(e.target.value, "gi");
    const filtered = this.state.genres.filter((genre) => regex.test(genre));
    this.setState({ filtered });
  }
  myFunction() {
    return (
      <ul>
        {genres.map((genre) => (
          <Link to={`/scout/genre/${genre}`}>
            <li>{convertGenreToProperNoun(genre)}</li>
          </Link>
        ))}
      </ul>
    );
  }
  render() {
    const { genres, filtered } = this.state;
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
