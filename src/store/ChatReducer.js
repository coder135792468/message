import {
  CHAT_USER,
  CLEAR_CHAT_ROOM,
  CLEAR_CHAT_USER,
  CLEAR_FILTER,
  CLEAR_MESSAGES,
  CREATE_CHAT_ROOM,
  FILTER,
  GET_MESSAGES,
  GET_USERS,
  GET_USER_DATA,
  LOGOUT,
  SET_LOADING,
  SET_USER,
} from "./types";

const ChatReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user_id: payload,
        login: true,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case CHAT_USER:
      return {
        ...state,
        chatUser: payload,
      };
    case CREATE_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: payload,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case FILTER:
      return {
        ...state,
        filter: state.users.filter((ele) =>
          ele.name.match(new RegExp(`${payload}`, "gi"))
        ),
      };
    case SET_LOADING:
      return {
        ...state,
        loader: payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: null,
      };
    case CLEAR_CHAT_USER:
      return {
        ...state,
        chatUser: null,
      };
    case CLEAR_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    case LOGOUT:
      return {
        user_id: null,
        user: null,
        chatUser: null,
        login: false,
        users: null,
        error: null,
        filter: null,
        currentChatRoom: null,
        messages: [],
      };
    default:
      return state;
  }
};
export default ChatReducer;
