import React from "react";
import "../App.scss";
import { accessToken } from "../helper";
import Login from "./Login";
import Global from "./Global";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";

const AppContainer = styled.div`
  text-align: center;
  margin: 0;
  padding: 0;
`;

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
      <AppContainer>
        <GlobalStyle />
        {loggedIn ? <Global /> : <Login />}
      </AppContainer>
    );
  }
}

export default App;
