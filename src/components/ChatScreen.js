import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ChatContainer from "./ChatContainer";
import SideBar from "./layouts/SideBar";
import ChatContext from "../store/ChatContext";
import { Redirect } from "react-router-dom";
import Loader from "./layouts/Loader";
import { Helmet } from "react-helmet";

const ChatScreen = ({
  match: {
    params: { id },
  },
}) => {
  const chatContext = useContext(ChatContext);
  const {
    login,
    user_id,
    getChatUser,
    messages,
    currentChatRoom,
    chatUser,
    getMessages,
    createChatRoom,
    loader,
    setLoading,
  } = chatContext;
  useEffect(() => {
    setLoading(true);
    getChatUser(id);
    if (user_id && id) {
      createChatRoom(user_id, id);
      getMessages(user_id, id);
    }

    // eslint-disable-next-line
  }, [id]);
  return login ? (
    <ChatScreenCon>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Messager | Inbox</title>
      </Helmet>
      <SideBar activeChat={id} />
      {loader && <Loader />}
      {chatUser && (
        <ChatContainer
          user={chatUser}
          room={currentChatRoom}
          messages={messages}
          my_id={user_id}
          chat_id={id}
        />
      )}
    </ChatScreenCon>
  ) : (
    <Redirect to="/login" />
  );
};

const ChatScreenCon = styled.div`
  display: flex;
`;
export default ChatScreen;
