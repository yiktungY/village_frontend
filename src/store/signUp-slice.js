import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "./userAction"

const initialState = {
  signUpLoading: false,
  userInfo: {},
  userToken: null,
  signUpError: null,
  signUpSuccess: false,
  isLoggedIn: false
}
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
  },
  extraReducers: {
    // register user
    [signUp.pending]: (state) => {
      state.signUpLoading = true
      state.signUpError = null
    },
    [signUp.fulfilled]: (state, payload) => {
      state.signUpLoading = false
      state.signUpSuccess = true // registration successful
      state.userInfo = payload
      state.isLoggedIn = true
    },
    [signUp.rejected]: (state, payload) => {
      state.signUpLoading = false
      state.signUpError = payload
    },
  },
})

export default signUpSlice;