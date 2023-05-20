import httpClient from "./httpClient";
import { getAuthHeader } from "../service/tokenService";

const createChat = async () => {
  const response = await httpClient.post('/api/chats', { headers: getAuthHeader() });
  return response.data;
}

const getUserChats = async () => {
  const response = await httpClient.get('/api/chats', { headers: getAuthHeader() });
  return response.data;
}

export { createChat, getUserChats }