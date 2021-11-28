import React from "react";
import FaceIcon from "@material-ui/icons/Face";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Chatbox = ({ user, active }) => {
  const { email, name, id, photoUrl } = user;
  return (
    <LinkCon to={`/chats/${id}`}>
      <Container active={active}>
        {photoUrl ? <Image src={photoUrl} /> : <FaceIcon />}
        <Name>
          <strong>{name}</strong>

          <LastMessage>{email}</LastMessage>
        </Name>
      </Container>
    </LinkCon>
  );
};
const LinkCon = styled(Link)`
  text-decoration: none;
  color: grey;
`;
const Container = styled.div`
  height: 60px;
  border-bottom: 2px solid whitesmoke;
  display: grid;
  grid-template-columns: 1fr 4fr;
  place-items: center;
  ${({ active }) =>
    active &&
    `
    background: #e5fbb8;
      border-radius:45px 0px 0px 45px;
    `}
  :hover {
    background: rgba(0, 0, 0, 0.07);
  }
`;
const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const Name = styled.p`
  font-size: medium;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const LastMessage = styled.small`
  font-size: small;
`;
export default Chatbox;
