import axios from 'axios';
import { refreshAccessToken, getRefreshToken } from "../service/tokenService";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'client_id': process.env.REACT_APP_CLIENT_ID
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    const refreshTokenAvailable = refreshToken && refreshToken.length > 0;

    if (error.response.status === 401 && !originalRequest._retry && refreshTokenAvailable) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken(); // Refresh the access token
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Update the request header with the new access token
      return apiClient(originalRequest); // Retry the original request
    }

    return Promise.reject(error);
  }
);

export default apiClient;

