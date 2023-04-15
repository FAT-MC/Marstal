import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  error: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {
    authChecked: (state, action) => {
      // check auth here 

      // update auth status
      state.isLoggedIn = true
    },
  },
})

export { authSlice }


// Action creators are generated for each case reducer function
export const { authChecked } = authSlice.actions

export default authSlice.reducer