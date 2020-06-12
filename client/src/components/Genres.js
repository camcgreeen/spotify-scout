import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { genres, convertGenreToProperNoun } from "../helper";

class Genres extends React.Component {
  constructor() {
    super();

    this.state = {
      genres,
    };
  }

  render() {
    const { genres } = this.state;
    return (
      <div className="Genres">
        <ul>
          {genres.map((genre) => (
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
