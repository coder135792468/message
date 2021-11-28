import {
  CHAT_USER,
  CLEAR_CHAT_ROOM,
  CLEAR_CHAT_USER,
  CLEAR_FILTER,
  CLEAR_MESSAGES,
  CREATE_CHAT_ROOM,
  ERROR,
  FILTER,
  GET_MESSAGES,
  GET_USERS,
  GET_USER_DATA,
  LOGOUT,
  SET_LOADING,
  SET_USER,
} from "./types";
import ChatReducer from "./ChatReducer";
import ChatContext from "./ChatContext";
import { auth, db } from "../firebase";
import { useReducer } from "react";
import { getID } from "../utils";
const ChatState = ({ children }) => {
  const initialState = {
    user_id: null,
    user: null,
    chatUser: null,
    login: false,
    users: null,
    error: null,
    filter: null,
    currentChatRoom: null,
    messages: [],
    loader: false,
  };
  const [state, dispatch] = useReducer(ChatReducer, initialState);

  /*
  it basically for register and login both pages
  if login is true then login 
  otherwise register
  */
  const registerLogin = async (login, name, email, password) => {
    if (login) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setLastSeen();
          dispatch({
            type: SET_USER,
            payload: getID(),
          });
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
          dispatch({
            type: ERROR,
            payload: error.message,
          });
        });
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setLastSeen();
          db.collection("Users").doc(getID()).set({
            name,
            email,
            password,
            id: getID(),
          });
          dispatch({
            type: SET_USER,
            payload: getID(),
          });
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
          dispatch({
            type: ERROR,
            payload: error.message,
          });

          // ..
        });
    }
  };

  //get users by id is basiclly for my user id
  const getUserById = async (id) => {
    db.collection("Users")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({
            type: GET_USER_DATA,
            payload: doc.data(),
          });
        }
      });
  };

  //lets load all teh users and then send it
  const loadUsers = (id) => {
    const data = [];
    db.collection("Users")
      .get()
      .then((docs) => {
        docs.forEach((snap) => {
          if (snap.id !== id) {
            data.push(snap.data());
          }
        });
      })
      .then(() => {
        dispatch({
          type: GET_USERS,
          payload: data,
        });
        setLoading(false);
      });
  };

  //filter user for search ability
  const filterUsers = (text) => {
    dispatch({
      type: CLEAR_FILTER,
    });
    if (!text) return;
    dispatch({
      type: FILTER,
      payload: text,
    });
  };

  //get chat user from which i wanna chat
  const getChatUser = (id) => {
    dispatch({
      type: CLEAR_CHAT_USER,
    });
    db.collection("Users")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({
            type: CHAT_USER,
            payload: doc.data(),
          });
        }
      });
  };

  //create chat room and check if the room is already created or not

  const createChatRoom = (myId, chatID) => {
    dispatch({
      type: CLEAR_CHAT_ROOM,
    });

    const data = {
      users: {
        user1: myId,
        user2: chatID,
      },
      message: [],
    };
    db.collection("chats")
      .doc(chatID + myId)
      .get()
      .then((docs) => {
        if (docs.exists) {
          dispatch({
            type: CREATE_CHAT_ROOM,
            payload: docs.id,
          });
        } else {
          db.collection("chats")
            .doc(myId + chatID)
            .get()
            .then((docs) => {
              if (docs.exists) {
                dispatch({
                  type: CREATE_CHAT_ROOM,
                  payload: docs.id,
                });
              } else {
                //create a room
                db.collection("chats")
                  .doc(myId + chatID)
                  .set(data)
                  .then(() => {
                    dispatch({
                      type: CREATE_CHAT_ROOM,
                      payload: myId + chatID,
                    });
                  });

                //just created room
                console.log("created now");
              }
            });
        }
      });
  };

  //get all teh messages in the particular room with some validation if room is already exists or or not

  const getMessages = (myId, chatID, clear = true) => {
    if (clear) {
      dispatch({
        type: CLEAR_MESSAGES,
      });
    }
    db.collection("chats")
      .doc(chatID + myId)
      .get()
      .then((docs) => {
        if (docs.exists) {
          db.collection("chats")
            .doc(chatID + myId)
            .onSnapshot((doc) => {
              if (doc.exists) {
                dispatch({
                  type: GET_MESSAGES,
                  payload: doc.data()["message"],
                });
              }
            });
        } else {
          db.collection("chats")
            .doc(myId + chatID)
            .onSnapshot((doc) => {
              if (doc.exists) {
                dispatch({
                  type: GET_MESSAGES,
                  payload: doc.data()["message"],
                });
              } else {
                console.log("No such document!");
              }
            });
        }
      });
  };
  //send messages
  const sendMessages = (room, msg) => {
    db.collection("chats")
      .doc(room)
      .update({
        message: [
          ...state.messages,
          {
            msg,
            msgId: getID(),
            time: Date.now(),
          },
        ],
      });
    setLastSeen();
    dispatch({
      type: GET_MESSAGES,
      payload: [
        ...state.messages,
        {
          msg,
          msgId: getID(),
        },
      ],
    });
  };

  const setLastSeen = () => {
    db.collection("Users")
      .doc(getID())
      .update({
        lastseen: new Date().toLocaleString("en-US"),
      });
  };

  //logout user
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const setLoading = (load) => {
    dispatch({
      type: SET_LOADING,
      payload: load,
    });
  };
  return (
    <ChatContext.Provider
      value={{
        user: state.user,
        user_id: state.user_id,
        chatUser: state.chatUser,
        login: state.login,
        users: state.users,
        error: state.error,
        filter: state.filter,
        currentChatRoom: state.currentChatRoom,
        messages: state.messages,
        loader: state.loader,
        registerLogin,
        getUserById,
        loadUsers,
        filterUsers,
        getChatUser,
        createChatRoom,
        getMessages,
        sendMessages,
        logout,
        setLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatState;
