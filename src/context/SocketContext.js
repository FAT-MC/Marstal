import React, { useEffect, useState, createContext } from 'react';
import io from 'socket.io-client';
import { retrieveToken } from "../utils/storageManager"

const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [audioResponse, setAudioResponse] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL, { auth: { token: retrieveToken() } });
    setSocket(newSocket);

    return () => {
      socket && socket.disconnect()
    };
  }, []);

  useEffect(() => {
    socket && setUpListeners()
  }, [socket])

  const setUpListeners = () => {
    socket.on('connect', () => {
      console.log(`Socket ${socket.id} Connected to server`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} Disconnected from server`);
    });

    socket.on("connect_error", (err) => {
      console.error(err);
    });

    socket.on('response', (aiAudioResponse) => {
      setAudioResponse(aiAudioResponse);
    });
  }

  const sendMessage = (message) => {
    socket && socket.emit('chat', message);
  }

  return (
    <SocketContext.Provider value={{ sendMessage, audioResponse }}>
      {children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProvider };