import React from "react";
import styled from "styled-components";
import HomeScreen from "./components/HomeScreen";
import ChatScreen from "./components/ChatScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterLoginPage from "./components/RegisterLogin";
import SettingPage from "./components/SettingPage";

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <Route path="/chats/:id" component={ChatScreen} />
          <Route path="/login" component={RegisterLoginPage} />
          <Route path="/register" component={RegisterLoginPage} />
          <Route path="/setting" component={SettingPage} />
          <Route path="/" component={HomeScreen} />
        </Switch>
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  max-width: 90vw;
  max-height: 90vh;
  height: 90vh;
  overflow: scroll;
  margin: 5vh auto;
  position: relative;
  border: 2px solid whitesmoke;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export default App;
