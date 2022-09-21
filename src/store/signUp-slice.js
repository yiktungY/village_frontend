import { createSlice } from "@reduxjs/toolkit";
import { signUpAction } from "./userAction"

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
  isLoggedIn: false
}
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
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
  },
})

export default signUpSlice;