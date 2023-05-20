import httpClient from "./httpClient";
import { getAuthHeader } from "../service/tokenService";

const createChatMessage = async (chatId) => {
  const response = await httpClient.post(`/api/chats/${chatId}/messages`, { headers: getAuthHeader() });
  return response.data;
}

const getChatMessages = async (chatId) => {
  const response = await httpClient.get(`/api/chats/${chatId}/messages`, { headers: getAuthHeader() });
  return response.data;
}

export { getChatMessages, createChatMessage }