import React from "react";
import "../App.scss";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  navStyle = { color: "white" };

  render() {
    return (
      <nav>
        <Link to="/" style={this.navStyle}>
          <h3>Logo</h3>
        </Link>
        <ul className="nav-links">
          <Link to="/" style={this.navStyle}>
            <li>Home</li>
          </Link>
          <Link to="/tracks" style={this.navStyle}>
            <li>Tracks</li>
          </Link>
          <Link to="/artists" style={this.navStyle}>
            <li>Artists</li>
          </Link>
          <Link to="/genres" style={this.navStyle}>
            <li>Genres</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
