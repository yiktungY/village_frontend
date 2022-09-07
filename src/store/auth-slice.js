import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "./userAction"

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
  isLoggedIn: false
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [signUp.pending]: (state) => {
      state.signUpLoading = true
      state.signUpError = null
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.signUpLoading = false
      state.signUpSuccess = true // registration successful
      state.userInfo = payload
    },
    [signUp.rejected]: (state, { payload }) => {
      state.signUpLoading = false
      state.signUpError = payload
    },
  },
})

export const authActions = authSlice.actions

export default authSlice;