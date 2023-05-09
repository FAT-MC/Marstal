import React, { useEffect, useState, createContext } from 'react';
import io from 'socket.io-client';
import { getAccessToken, refreshAccessToken } from "../service/tokenService";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [audioResponse, setAudioResponse] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL, { auth: { token: getAccessToken() } });
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

    socket.on('disconnect', (reason) => {
      console.log(`Socket Disconnected from server`);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
    });

    socket.on("connect_error", async (err) => {
      console.error(err);
      if (err.message === "Unauthorized") {
        const newAccessToken = await refreshAccessToken();
        socket.auth.token = newAccessToken;
        socket.connect();
      }
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