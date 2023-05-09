import { createSlice } from "@reduxjs/toolkit";
import {
  getAccessToken,
  requestNewTokens
} from "../../service/tokenService";

const initialState = {
  isLoading: false,
  isAuthenticated: getAccessToken() && getAccessToken().length > 0,
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
    }
  },
})

const { actions, reducer } = authSlice;

// Action creators are generated for each case reducer function
const {
  startLogin,
  succeedLogin,
  failedLogin
} = actions;

const login = (oAuthToken) => async (dispatch, state) => {
  dispatch(startLogin())

  try {
    await requestNewTokens(oAuthToken)
    dispatch(succeedLogin());
  } catch (error) {
    dispatch(failedLogin(error))
  }
}

export { login }
export default reducer