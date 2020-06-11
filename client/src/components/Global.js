import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Nav from "./Nav";
import Tracks from "./Tracks";
import Artists from "./Artists";
import Genres from "./Genres";
import Scout from "./Scout";

class Global extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS, ", this.props);
    this.token = this.props.token;
    this.state = {
      topArtists: {},
      user: {},
      userFollowedArtists: {},
      userPlaylists: {},
      userCurrentlyPlaying: {},
      recommendations: {},
      previews: [],
      isLoaded: false,
    };
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.getTrackPreview = this.getTrackPreview.bind(this);
  }
  componentDidMount() {
    let fetchUser = async () => {
      let response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + this.token },
      });
      let json = await response.json();
      this.setState({ user: json });
      return json;
    };
    let fetchUserFollowedArtists = async () => {
      let response = await fetch(
        "https://api.spotify.com/v1/me/following?type=artist",
        {
          headers: { Authorization: "Bearer " + this.token },
        }
      );
      let json = await response.json();
      this.setState({ userFollowedArtists: json });
      return json;
    };
    let fetchTopArtists = async () => {
      let response = await fetch(
        "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0",
        {
          headers: { Authorization: "Bearer " + this.token },
        }
      );
      let json = await response.json();
      this.setState({ topArtists: json });
      return json;
    };
    let fetchUserPlaylists = async () => {
      let response = await fetch(
        "https://api.spotify.com/v1/me/playlists?limit=50",
        {
          headers: { Authorization: "Bearer " + this.token },
        }
      );
      let json = await response.json();
      this.setState({ userPlaylists: json });
      return json;
    };
    let fetchRecommendations = async () => {
      let response = await fetch(
        "https://api.spotify.com/v1/recommendations?seed_tracks=64D3dzWyj0GpQT1AHx4kbK",
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      let json = await response.json();
      this.setState({ recommendations: json });
      return json;
    };
    Promise.all([
      fetchTopArtists(),
      fetchUser(),
      fetchUserFollowedArtists(),
      fetchUserPlaylists(),
      fetchRecommendations(),
    ])
      .then(() => {
        this.setState({
          isLoaded: true,
        });
        console.log("Everything has been loaded.");
        this.setTrackPreviews();
        console.log("TOP ARTISTS = ", this.state.topArtists);
        console.log("USER = ", this.state.user);
        console.log("FOLLOWED ARTISTS = ", this.state.userFollowedArtists);
        console.log("PLAYLISTS = ", this.state.userPlaylists);
        console.log("RECOMMENDATIONS = ", this.state.recommendations);
      })
      .catch((err) => console.log("ERROR CAUGHT ON Promise.all", err));
  }

  addToPlaylist() {
    console.log("userPlaylists", this.state.userPlaylists);
    console.log("userPlaylists");
  }
  addToLikedSongs(id) {
    console.log("You added a song to your Liked Songs, of id: " + id);
    fetch("https://api.spotify.com/v1/me/tracks?ids=" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + this.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  async getTrackPreview(id) {
    if (this.token) {
      const res = await fetch("https://api.spotify.com/v1/tracks/" + id, {
        headers: {
          Authorization: "Bearer " + this.token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      return json.preview_url;
    }
  }
  async setTrackPreviews() {
    if (this.token) {
      for (let i = 0; i < this.state.recommendations.tracks.length; i++) {
        let trackPreview = await this.getTrackPreview(
          this.state.recommendations.tracks[i].id
        );
        this.setState((prevState) => ({
          previews: [...prevState.previews, trackPreview],
        }));
      }
    }
  }
  render() {
    return (
      <Router>
        <div className="Global">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tracks" component={Tracks} />
            <Route path="/artists" component={Artists} />
            <Route path="/genres" component={Genres} />
            <Route path="/scout" exact component={Scout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Global;
