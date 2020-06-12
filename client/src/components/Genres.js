import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { genres } from "../helper";

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
          {genres.map((genre) => {
            // handle the case of that pesky second "h"
            // fix this bit cos it's hacky
            return genre === "hip-hop" ? (
              <Link to={`/scout/genre/${genre}`}>
                <li>{"Hip-Hop"}</li>
              </Link>
            ) : (
              <li>
                <Link to={`/scout/genre/${genre}`}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Genres;
