import { createSlice } from "@reduxjs/toolkit";
import { loginWithToken } from "../../api";
import { storeToken, retrieveToken } from "../../utils/storageManager";

const initialState = {
  isLoading: false,
  isAuthenticated: retrieveToken() && retrieveToken().length > 0,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLogin(state, action) {
      state.isLoading = true;
    },
    succeedLogin(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = null;
    },
    failedLogin(state, action) {
      state.isLoading = false;
      state.isAuthenticated = null;
      state.error = action.payload
    },
    updateLoginStatus(state, action) {
      state.isAuthenticated = action.payload ? true : false
    }
  },
})

const { actions, reducer } = authSlice;

// Action creators are generated for each case reducer function
const {
  startLogin,
  succeedLogin,
  failedLogin,
  updateLoginStatus
} = actions;

const login = (token) => async (dispatch, state) => {
  dispatch(startLogin())

  try {
    const authResponse = await loginWithToken(token);
    storeToken(authResponse.auth_token);
    dispatch(succeedLogin());
  } catch (error) {
    dispatch(failedLogin(error))
  }
}

export { login }
export default reducer