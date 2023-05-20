import { createSlice } from "@reduxjs/toolkit";
import { getUserChats, createChat } from "../../api/chatApi";
import { getChatMessages, createChatMessage } from "../../api/chatMessageApi";

const initialState = {
  isFetchingChats: true,
  isAddingChats: false,
  isFetchingMessages: true,
  isWaitingForReply: false,
  chats: [],
  error: null,
  currentChat: null,
  currentMessages: []
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startFetchChats(state, action) {
      state.isFetchingChats = true;
    },
    succeedFetchChats(state, action) {
      state.isFetchingChats = false;
      state.chats = action.payload;
    },
    failedFetchChats(state, action) {
      state.isFetchingChats = false;
      state.error = action.payload
    },
    startAddChat(state, action) {
      state.isAddingChats = true;
    },
    succeedAddChat(state, action) {
      state.isAddingChats = false;
      state.chats.unshift(action.payload);
    },
    failedAddChat(state, action) {
      state.isAddingChats = false;
      state.error = action.payload;
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    startFetchMessages(state, action) {
      state.isFetchingMessages = true;
    },
    succeedFetchMessages(state, action) {
      state.isFetchingMessages = false;
      state.currentMessages = action.payload;
    },
    failedFetchMessages(state, action) {
      state.isFetchingMessages = false;
      state.error = action.payload;
    },
    receivedResponse(state, action) {
      if (state.currentChat) {
        state.currentMessages.push(action.payload);
      }
      state.isWaitingForReply = action.payload.role === "user"
    },
    failedToReceiveResponse(state, action) {
      state.isWaitingForReply = false;
      state.error = action.payload;
    }
  },
})

const { actions, reducer } = chatSlice;

// Action creators are generated for each case reducer function
const {
  startFetchChats,
  succeedFetchChats,
  failedFetchChats,

  startAddChat,
  succeedAddChat,
  failedAddChat,

  setCurrentChat,
  
  startFetchMessages,
  succeedFetchMessages,
  failedFetchMessages,

  receivedResponse,
  failedToReceiveResponse
} = actions;

const fetchChats = () => async (dispatch, state) => {
  dispatch(startFetchChats())

  try {
    const chats = await getUserChats()
    dispatch(succeedFetchChats(chats));
  } catch (error) {
    dispatch(failedFetchChats(error))
  }
}

const addChat = () => async (dispatch, state) => {
  dispatch(startAddChat())

  try {
    const newChat = await createChat();
    dispatch(succeedAddChat(newChat));
  } catch (error) {
    dispatch(failedAddChat(error))
  }
}

const fetchCurrentMessages = (currentChat) => async (dispatch, state) => {
  dispatch(startFetchMessages());

  try {
    const messages = await getChatMessages(currentChat.id);
    dispatch(succeedFetchMessages(messages))
  } catch (error) {
    dispatch(failedFetchMessages(error))
  }
}

export {
  fetchChats,
  addChat,
  fetchCurrentMessages,
  setCurrentChat,
  receivedResponse,
  failedToReceiveResponse
}
export default reducer