import React from "react";
import "./App.css";
import SpotifyWebAPI from "spotify-web-api-js";

const spotifyWebAPI = new SpotifyWebAPI();

let searchParams = new URLSearchParams(window.location.search);
let accessToken = searchParams.get("access_token");

class App extends React.Component {
    constructor(props) {
        super(props);
        if (accessToken) {
            spotifyWebAPI.setAccessToken(accessToken);
        }
        this.state = {
            loggedIn: accessToken ? true : false,
            topArtists: {},
            user: {},
            userFollowedArtists: {},
            userPlaylists: {},
            nowPlaying: {
                name: "Not checked",
                albumArt: "",
            },
            isLoaded: false,
        };
    }
    getNowPlaying() {
        spotifyWebAPI.getMyCurrentPlaybackState().then((res) => {
            this.setState({
                nowPlaying: {
                    name: res.item.name,
                    albumArt: res.item.album.images[0].url,
                },
            });
        });
    }
    componentDidMount() {
        let fetchTopArtists = fetch(
            "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0",
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    topArtists: res,
                });
                console.log(
                    "this.state.topArtists from componentDidMount: ",
                    this.state.topArtists
                );
            });
        let fetchUser = fetch("https://api.spotify.com/v1/me", {
            headers: { Authorization: "Bearer " + accessToken },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    user: res,
                });
                console.log("USER", res);
            });
        let fetchUserFollowedArtists = fetch(
            "https://api.spotify.com/v1/me/following?type=artist",
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    userFollowedArtists: res,
                });
                console.log("userFollowedArtists", res);
            });
        let fetchUserPlaylists = fetch(
            "https://api.spotify.com/v1/me/playlists?limit=50",
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    userPlaylists: res,
                });
                console.log("user playlists: ", res);
            });
        Promise.all([
            fetchTopArtists,
            fetchUser,
            fetchUserFollowedArtists,
            fetchUserPlaylists,
        ])
            .then(() => {
                this.setState({
                    isLoaded: true,
                });
                console.log("Everything has been loaded.");
            })
            .catch((err) => console.log(err));
    }
    render() {
        console.log("just checking", this.state.topArtists);
        return (
            <div className="App">
                {this.state.loggedIn ? (
                    <React.Fragment>
                        {this.state.isLoaded ? (
                            <div className="container">
                                <a href={this.state.user.uri}>
                                    {this.state.user.images.length > 0 ? (
                                        <img
                                            src={this.state.user.images[0].url}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <h1>No profile picture to display</h1>
                                    )}
                                </a>
                                <h1>
                                    Welcome, {this.state.user.display_name}{" "}
                                </h1>
                                <h2>
                                    You have {this.state.user.followers.total}{" "}
                                    followers
                                </h2>
                                <h2>
                                    You have {this.state.userPlaylists.total}{" "}
                                    playlists
                                </h2>
                            </div>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </React.Fragment>
                ) : (
                    <a href="http://localhost:8888">
                        <button>Login With Spotify</button>
                    </a>
                )}
            </div>
        );
    }
}

if (true) {
    console.log("something");
}

export default App;
