import React from "react";
import "../App.css";
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
            return genre === "hip-hop" ? (
              <li>{"Hip-Hop"}</li>
            ) : (
              <li>{genre.charAt(0).toUpperCase() + genre.slice(1)}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Genres;
