import httpClient from "./httpClient";

const sendMessage = async (message) => {
  const response = await httpClient.post('/api/chat', { message: message })
  return response.data
}

export { sendMessage }