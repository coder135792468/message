import React, { useContext } from "react";
import styled from "styled-components";
import SideBar from "./layouts/SideBar";
import ChatContainer from "./ChatContainer";
import ChatContext from "../store/ChatContext";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

const HomeScreen = () => {
  const chatContext = useContext(ChatContext);
  const { login, user_id } = chatContext;

  return login && user_id ? (
    <Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Messager | Home</title>
      </Helmet>
      <SideBar activeChat={null} />
      <ChatContainer />
    </Container>
  ) : (
    <Redirect to="/login" />
  );
};

const Container = styled.div`
  display: flex;
`;
export default HomeScreen;
