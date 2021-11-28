import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ChatState from "./store/ChatStat";
ReactDOM.render(
  <ChatState>
    <App />
  </ChatState>,
  document.getElementById("root")
);
