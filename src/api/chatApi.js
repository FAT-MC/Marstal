import httpClient from "./httpClient";
import { getAuthHeader } from "../service/tokenService";

const postMessageToChat = async (message) => {
  const response = await httpClient.post('/api/chat', { message: message }, { headers: getAuthHeader() });
  return response.data;
}

export { postMessageToChat }