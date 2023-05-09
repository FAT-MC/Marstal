import httpClient from "./httpClient";


const loginWithToken = async (token) => {
  if (!token) {
    throw new Error("Invalid token when logging in");
  }

  const response = await httpClient.post('/auth', { access_token: token })
  return response.data;
}

const requestNewAccessToken = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    throw new Error("Invalid old refresh token");
  }

  const response = await httpClient.post('/auth/refresh-token', { refresh_token: oldRefreshToken })
  return response.data;
}

export { loginWithToken, requestNewAccessToken }