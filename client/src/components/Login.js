import React from "react";
import "../App.css";

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <a href={"http://192.168.1.142:8888"}>
          <button>Login With Spotify</button>
        </a>
      </div>
    );
  }
}

export default Login;
