const storeTokens = (tokenPayload) => {
  if (!tokenPayload || !tokenPayload.accessToken || !tokenPayload.refreshToken) {
    throw new Error("Error saving invalid tokens");
  }

  localStorage.setItem("tokens", JSON.stringify(tokenPayload));
}

const retrieveTokens = () => {
  const storedTokens = localStorage.getItem("tokens");
  return storedTokens && JSON.parse(storedTokens);
}

const resetStorage = () => {
  return localStorage.clear();
}

export { storeTokens, retrieveTokens, resetStorage }