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
                headers: { Authorization: "Bearer " + accessToken },
            });
            let json = await response.json();
            this.setState({ user: json });
            return json;
        };
        let fetchUserFollowedArtists = async () => {
            let response = fetch(
                "https://api.spotify.com/v1/me/following?type=artist",
                {
                    headers: { Authorization: "Bearer " + accessToken },
                }
            );
            let json = await (await response).json();
            this.setState({ userFollowedArtists: json });
            return json;
        };
        let fetchTopArtists = async () => {
            let response = await fetch(
                "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0",
                {
                    headers: { Authorization: "Bearer " + accessToken },
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
                    headers: { Authorization: "Bearer " + accessToken },
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
                        Authorization: "Bearer " + accessToken,
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
                console.log(
                    "FOLLOWED ARTISTS = ",
                    this.state.userFollowedArtists
                );
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
                Authorization: "Bearer " + accessToken,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    }
    async getTrackPreview(id) {
        if (accessToken) {
            const res = await fetch("https://api.spotify.com/v1/tracks/" + id, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
            const json = await res.json();
            return json.preview_url;
        }
    }
    async setTrackPreviews() {
        if (accessToken) {
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
        const {
            loggedIn,
            isLoaded,
            user,
            userPlaylists,
            recommendations,
            previews,
        } = this.state;
        return (
            <div className="App">
                {loggedIn ? (
                    <React.Fragment>
                        {isLoaded ? (
                            <div className="container">
                                <a href={user.uri}>
                                    {user.images.length > 0 ? (
                                        <img
                                            src={user.images[0].url}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <h1>No profile picture to display</h1>
                                    )}
                                </a>
                                <h1>Welcome, {user.display_name} </h1>
                                <h2>
                                    You have {user.followers.total} followers
                                </h2>
                                <h2>
                                    You have {userPlaylists.total} playlists
                                </h2>{" "}
                                <button onClick={this.addToPlaylist}>
                                    Add to Starred
                                </button>
                                {
                                    <ul>
                                        Recommendations based on Track input:
                                        {recommendations.tracks.map(
                                            (track, i) => {
                                                return (
                                                    <a
                                                        href={previews[i]}
                                                        target="_blank"
                                                    >
                                                        <li>{track.name}</li>
                                                    </a>
                                                );
                                            }
                                        )}
                                    </ul>
                                }
                                <h2>Testing some audio</h2>
                                <audio controls>
                                    <source
                                        src="https://p.scdn.co/mp3-preview/ea17e9c75d096b1c44fecdf843b49bca479cbe9c?cid=d59bd9f49a544f04b0e0c6b476c3f07c"
                                        type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                                <br />
                                <button
                                    onClick={() =>
                                        this.addToLikedSongs(
                                            "123W7snVRuONLwn2uMdJB3"
                                        )
                                    }
                                >
                                    Add a song to Liked Songs
                                </button>
                            </div>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </React.Fragment>
                ) : (
                    <a href={"http://192.168.1.142:8888"}>
                        <button>Login With Spotify</button>
                    </a>
                )}
            </div>
        );
    }
}

export default App;
