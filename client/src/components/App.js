import React from "react";
import "../App.scss";
import { accessToken } from "../helper";
import Login from "./Login";
import Global from "./Global";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: accessToken ? true : false,
    };
  }
  render() {
    const { loggedIn } = this.state;
    return <div className="App">{loggedIn ? <Global /> : <Login />}</div>;
  }
}

export default App;
