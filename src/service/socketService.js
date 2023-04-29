
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_URL);

socket.on('connect', () => {
  console.log(`Socket ${socket.id} Connected to server`);
});

socket.on('disconnect', () => {
  console.log(`Socket ${socket.id} Disconnected from server`);
});

const sendMessage = (message) => {
  console.log(message);
  socket.emit('chat', message);
}

const receiveMessage = (callback) => {
  socket.on('response', (aiAudioResponse) => {
    console.log('Received message:', aiAudioResponse);
    callback(aiAudioResponse);
  });
}

export { sendMessage, receiveMessage }