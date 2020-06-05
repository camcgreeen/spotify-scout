import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebAPI = new Spotify();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams(); // this will give us an object that has an access token and refresh token
    if (params.access_token) {
      spotifyWebAPI.setAccessToken(params.access_token);
    }
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Not checked",
        albumArt: ""
      },
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyWebAPI.getMyCurrentPlaybackState()
      .then((res) => { // let's try logging the resonse object res tomorrow to get a better understanding of what's happening here
        this.setState({
          nowPlaying: {
            name: res.item.name,
            albumArt: res.item.album.images[0].url
          }
        });
      });
  }
  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button>Login With Spotify</button>
        </a>
        <div>Now Playing { this.state.nowPlaying.name }</div>
        <div>
          <img src={ this.state.nowPlaying.albumArt } alt="album cover for song currently playing" style={ { width: 100 } } />
        </div>
        { this.state.loggedIn &&
          <button onClick={ () => this.getNowPlaying() }>Check Now Playing</button>
        }
      </div>
    )
  }
}

export default App;
