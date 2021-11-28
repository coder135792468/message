import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { IconButton } from "@material-ui/core";
import Chatbox from "./Chatbox";
import ChatContext from "../../store/ChatContext";
import { getID } from "../../utils";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "./Loader";
import SettingsIcon from "@material-ui/icons/Settings";

const SideBar = ({ activeChat }) => {
  const hasActiveChat = activeChat !== null;
  const show = useLocation().pathname === "/";
  const history = useHistory();
  const chatContext = useContext(ChatContext);
  const {
    login,
    getUserById,
    logout,
    user,
    loadUsers,
    users,
    filter,
    loader,
    filterUsers,
  } = chatContext;

  const [text, setText] = useState("");
  useEffect(() => {
    if (getID() && login) {
      getUserById(getID());
      loadUsers(getID());
    }

    // eslint-disable-next-line
  }, [login]);
  useEffect(() => {
    if (
      filter === null ||
      !filter ||
      filter?.length === 0 ||
      text.length === 0
    ) {
      setText("");
      filterUsers(text);
    }
    // eslint-disable-next-line
  }, [filter]);
  const onChange = ({ target: { value } }) => {
    setText(value);
    filterUsers(text);
  };
  const getData = (filter) => (!filter || !filter?.length ? users : filter);
  return (
    <SideBarContainer show={!show}>
      {loader && <Loader />}
      <Container>
        <NameCon onClick={() => history.push("/setting")}>
          <IconButton style={{ marginTop: "5px" }}>
            <SettingsIcon />
          </IconButton>
          <strong>
            {user?.name[0].toUpperCase()}
            {user?.name.slice(1, user.name.length)}
          </strong>
          {user?.photoUrl ? (
            <Image src={user?.photoUrl} />
          ) : (
            <PersonOutlineIcon />
          )}
        </NameCon>
        <Button
          onClick={() => {
            logout();
            history.push("/login");
          }}
        >
          <ExitToAppIcon />
        </Button>
      </Container>
      <SearchBar
        value={text}
        onChange={onChange}
        placeholder="Enter Name"
        type="search"
      />
      {users &&
        getData(filter)?.map((ele, index) => (
          <Chatbox
            key={index + 1}
            user={ele}
            active={hasActiveChat && ele.id === activeChat ? true : false}
          />
        ))}
    </SideBarContainer>
  );
};
const SideBarContainer = styled.div`
  overflow: scroll;
  height: 90vh;
  background: white;
  flex: 1;
  @media (max-width: 650px) {
    ${({ show }) =>
      show &&
      `
    display:none;
    flex:1;
    `}
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Container = styled.div`
  text-align: center;
  height: 60px;
  background: #b980f0;
  border: 1px solid whitesmoke;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 3;
`;
const NameCon = styled.p`
  display: flex;
  align-items: center;
  > strong {
    margin: 5px 10px;
    color: white;
  }
`;
const Image = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 5px;
  border-radius: 50%;
`;
const Button = styled(IconButton)``;
const SearchBar = styled.input`
  border: none;
  outline: none;
  width: 96%;
  height: 40px;
  padding: 0 2%;
  font-weight: 400;
  margin-bottom: 10px;
  border-bottom: 2px solid whitesmoke;
`;
export default SideBar;
