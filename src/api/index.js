import httpClient from "./httpClient";

const sendMessage = async (message) => {
  const response = await httpClient.post('/api/chat', { message: message });
  return response.data;
}

const loginWithToken = async (token) => {
  if (!token) {
    throw new Error("Invalid token when logging in");
  }

  const response = await httpClient.post('/auth', { access_token: token }, { headers: { client_id: process.env.REACT_APP_CLIENT_ID } })
  return response.data;
}

export { sendMessage, loginWithToken }