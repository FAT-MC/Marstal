import React, { useEffect, useState, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [audioResponse, setAudioResponse] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
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