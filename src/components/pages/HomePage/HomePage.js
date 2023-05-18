import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playAudioBuffer } from "../../../utils/audioHelper";
import { SocketContext } from "../../../context"
import { profileImage } from "../../../assets";
import {
  fetchChats,
  setCurrentChat,
  addChat,
  fetchCurrentMessages,
  startWaitForResponse,
  receivedResponse,
  failedToReceiveResponse
} from "../../../redux/features/chatSlice";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Sidebar,
  Conversation,
  Avatar,
  MessageSeparator,
  Button,
  Loader,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';
import { dateTimeHelper, MessageEvent, markdownConvertToHTML } from "../../../utils/utility";
import "./HomePage.css";

export function HomePage() {
  const { sendMessage, messageResponse } = useContext(SocketContext);
  const {
    isFetchingChats,
    isAddingChats,
    isFetchingMessages,
    isWaitingForReply,
    currentChat,
    currentMessages,
    chats,
    error
  } = useSelector(state => state.chat)
  const [inputText, setInputText] = useState("");
  const [messagesByDay, setMessagesByDay] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChats())
  }, [])

  useEffect(() => {
    if (currentChat) {
      dispatch(fetchCurrentMessages(currentChat))
    }
  }, [currentChat])

  useEffect(() => {
    if (currentMessages) {
      setMessagesByDay(convertMessagesByDay(currentMessages));
    }
  }, [currentMessages])

  // useEffect(() => {
  //   if (audioResponse) {
  //     const binaryAudioBuffer = audioResponse.audio;
  //     playAudioBuffer(binaryAudioBuffer)
  //       .finally(() => {
  //         setInputText("")
  //       })
  //   }
  // }, [audioResponse])

  useEffect(() => {
    if (messageResponse) {
      handleMessageResponse(messageResponse)
    }
  }, [messageResponse])

  const handleMessageResponse = (messageResponse) => {
    switch (messageResponse.event) {
      case MessageEvent.MESSAGE_RECEIVED:
      case MessageEvent.RESPONSE_GENERATED:
        dispatch(receivedResponse(messageResponse.payload))
        break;
      case MessageEvent.AUDIO_RESPONSE_GENERATED:
        break;
      default:
        break;
    }
  }

  const convertMessagesByDay = (messages) => {
    return messages.reduce((acc, message) => {
      const day = dateTimeHelper.getDate(message.created_at);
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(message);
      return acc;
    }, {});
  }

  const onTextChange = (value) => {
    setInputText(value)
  }

  const onSendMessage = () => {
    if (inputText && currentChat.id) {
      sendMessage({
        chatId: currentChat.id,
        message: inputText,
        audio: false
      }, (error) => {
        console.error(error)
        dispatch(failedToReceiveResponse(error))
      })

      setInputText("")
    }
  }

  const onSelectChat = (chat) => {
    dispatch(setCurrentChat(chat))
  }

  const getConversationList = () => {
    return chats.map((chat, index) => (
      <Conversation name={chat.topic} key={index} onClick={() => onSelectChat(chat)}>
        <Avatar src={profileImage} />
      </Conversation>))
  }

  const isAssistantMessage = (message) => {
    return message.role === "assistant";
  }

  const getMessageContent = () => {
    let messageList = [];
    Object.keys(messagesByDay).forEach(day => {
      messageList.push(
        <MessageSeparator as="h2" key={day}>
          {day}
        </MessageSeparator>
      );

      const dayMessages = messagesByDay[day].map((message, messageIndex) => (
        <Message key={`${day}+${messageIndex}`} model={{
          sentTime: dateTimeHelper.getTimeInDay(message.created_at),
          sender: isAssistantMessage(message) ? message.role : "User",
          direction: isAssistantMessage(message) ? "incoming" : "outgoing",
          position: "single",
          type: "html",
          payload: markdownConvertToHTML(message.content)
        }}>
          <Message.Footer
            sender={isAssistantMessage(message) ? message.role : null}
            sentTime={dateTimeHelper.getTimeInDay(message.created_at)} />
        </Message>
      ))

      messageList = messageList.concat(dayMessages);
    })

    return (
      <ChatContainer>
        <MessageList
          typingIndicator={isWaitingForReply ? (<TypingIndicator content="Assistant is typing" />) : null}
        >
          {messageList}
        </MessageList >
        <MessageInput
          placeholder="Type message here"
          value={inputText}
          onChange={onTextChange}
          onSend={onSendMessage}
          attachButton={false}
        />
      </ ChatContainer>
    )
  }

  return (
    <div className="p-HomePage__container">
      <MainContainer responsive>
        <Sidebar position="left" scrollable={true} style={isFetchingChats ? {
          "alignItems": "center",
          "justifyContent": "center"
        } : null}>
          {isFetchingChats ? <Loader /> : (
            <> <Button border>New Chat</Button>
              <ConversationList>
                {getConversationList()}
              </ConversationList>
            </>
          )}

        </Sidebar>

        {currentChat ? getMessageContent() : <ChatContainer></ ChatContainer>}
      </MainContainer>
    </div>
  )
}