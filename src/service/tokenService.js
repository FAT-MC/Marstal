import { retrieveTokens, storeTokens, resetStorage } from "../utils/storageManager";
import { loginWithToken, requestNewAccessToken } from "../api/authApi";

const storedTokens = retrieveTokens();
let appAccessToken = storedTokens && storedTokens.accessToken;
let appRefreshToken = storedTokens && storedTokens.refreshToken;


const requestNewTokens = async (oAuthToken) => {
  const authResponse = await loginWithToken(oAuthToken);
  const { accessToken, refreshToken } = authResponse.tokens;
  storeTokens(authResponse.tokens);

  appAccessToken = accessToken;
  appRefreshToken = refreshToken;
}

const refreshAccessToken = async () => {
  try {
    console.log("Refreshing access token...")
    const refreshTokenResponse = await requestNewAccessToken(appRefreshToken);
    const newAccessToken = refreshTokenResponse.accessToken;
    console.log(`New access token: ${newAccessToken}`);
    storeTokens({ accessToken: newAccessToken, refreshToken: appRefreshToken });

    appAccessToken = newAccessToken;
    return appAccessToken;
  } catch (error) {
    // TODO: show an alert popup saying the session expired and need to re-login
    resetTokens();
    window.location.reload(); // Handle refresh token failure, redirect to login page
  }
}

const resetTokens = () => {
  resetStorage();
  appAccessToken = null;
  appRefreshToken = null;
}

const getAccessToken = () => {
  return appAccessToken;
}

const getRefreshToken = () => {
  return appRefreshToken;
}

const getAuthHeader = () => {
  return { "Authorization": `Bearer ${appAccessToken}` }
}

export {
  requestNewTokens,
  resetTokens,
  refreshAccessToken,
  getRefreshToken,
  getAccessToken,
  getAuthHeader
}



