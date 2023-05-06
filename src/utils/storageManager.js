const storeToken = (token) => {
  if (!token) {
    throw new Error("Error saving invalid token");
  }

  localStorage.setItem("auth_token", token);
}

const retrieveToken = () => {
  return localStorage.getItem("auth_token");
}

export { storeToken, retrieveToken }