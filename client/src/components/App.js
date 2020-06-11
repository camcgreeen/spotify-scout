import React from "react";
import "../App.css";
import Login from "./Login";
import Global from "./Global";

let searchParams = new URLSearchParams(window.location.search);
let accessToken = searchParams.get("access_token");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: accessToken ? true : false,
    };
  }
  render() {
    const { loggedIn } = this.state;
    return (
      <div className="App">
        {loggedIn ? <Global token={accessToken} /> : <Login />}
      </div>
    );
  }
}

export default App;
