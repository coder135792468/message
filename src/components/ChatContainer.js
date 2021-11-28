import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FaceIcon from "@material-ui/icons/Face";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import ChatContext from "../store/ChatContext";
import ChatMessage from "./layouts/ChatMessage";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TimeAgo from "react-timeago";
const ChatContainer = ({ user, room, messages, my_id, chat_id }) => {
  const show = chat_id ? true : false;
  // console.log(user);
  const [text, setText] = useState("");
  const chatContext = useContext(ChatContext);
  const { getMessages, sendMessages, setLoading } = chatContext;

  const endMessage = useRef(null);
  const sendMessage = () => {
    if (!text || text.trim().length === 0) return;
    sendMessages(room, text);
    getMessages(my_id, chat_id, false);
    setText("");
  };
  useEffect(() => {
    if (room) {
      endMessage.current.scrollTo({
        top: endMessage.current.scrollHeight + endMessage.current.clientHeight,
        behavior: "smooth",
      });
    }
    setLoading(false);

    // eslint-disable-next-line
  }, [messages]);
  return (
    <Container show={show}>
      {user?.id ? (
        <>
          <Header>
            {show && (
              <BackToHome to="/">
                <ArrowBackIosIcon style={{ fontSize: "20px" }} />
              </BackToHome>
            )}
            {user?.photoUrl ? <Image src={user?.photoUrl} /> : <FaceIcon />}
            <Name>
              <strong>
                {user?.name}:{user?.email}
              </strong>
              <br />
              <LastMessage>
                Last Active:
                {user?.lastseen ? (
                  <TimeAgo date={user?.lastseen} />
                ) : (
                  "Unavlaible"
                )}
              </LastMessage>
            </Name>
          </Header>
          <ChatCon ref={endMessage}>
            {/* //we need to render chat in teh room here  */}
            {messages?.map((ele, index) => (
              <ChatMessage
                key={index + 1}
                you={ele.msgId === my_id ? true : false}
                data={ele}
              />
            ))}
          </ChatCon>
          <Footer>
            <ChatInput
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Your message..."
            ></ChatInput>
            <IconButton
              onClick={sendMessage}
              variant="container"
              color="primary"
            >
              <SendIcon></SendIcon>
            </IconButton>
          </Footer>
        </>
      ) : (
        <StyledHeading
          color="primary"
          variant="contained"
          label="Start a Chat"
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1.5;
  background: #e5fbb8;
  height: 90vh;
  @media (max-width: 650px) {
    ${({ show }) =>
      !show &&
      `
    display:none;
    `}
  }
`;
const Header = styled.div`
  height: 60px;
  background: #b980f0;
  border: 1px solid whitesmoke;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  @media (max-width: 650px) {
    padding: 0;
  }
`;

const BackToHome = styled(Link)`
  margin: 0 10px;
`;
const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const Name = styled.p`
  font-size: medium;
  color: white;
  margin: 0 20px;
  @media (max-width: 650px) {
    font-size: 0.8rem;
  }
`;
const LastMessage = styled.small`
  font-size: small;
`;

const ChatCon = styled.div`
  height: calc(90vh - 110px);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const Footer = styled.div`
  height: 50px;
  background: white;
  border: 2px solid whitesmoke;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
`;
const ChatInput = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  border: 2px solid whitesmoke;
  background: #efefef;
  border-radius: 40px;
  padding: 5px 20px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
  }
`;

const StyledHeading = styled(Chip)`
  font-size: medium;
  margin: 40% 10%;
  width: 80%;
`;

export default ChatContainer;
