import { createSlice } from "@reduxjs/toolkit";
import { signUpAction } from "./userAction"

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
  isLoggedIn: false,
  finishBorading: false
}
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    finishedBoarding(state) {
      state.success = false
      state.finishBorading = true
    }
  },
  extraReducers: {
    // register user
    [signUpAction.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [signUpAction.fulfilled]: (state, payload) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.payload
      state.isLoggedIn = true
    },
    [signUpAction.rejected]: (state, payload) => {
      state.loading = false
      state.error = payload.payload.error
    },
  }
})

export const signUpActions = signUpSlice.actions

export default signUpSlice;

