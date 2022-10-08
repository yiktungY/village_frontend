import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./userAction"

const initialState = {
  loginOpen: false,
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  isLoggedIn: false
}
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openForm: (state) => {
      state.loginOpen = !state.loginOpen
      state.error = null
    },
    updateInfo(state, action) {
      const info = action.payload;
      state.userInfo.avatar_url = info.icon;
    },
    autoLogin(state, action) {
      const info = action.payload;
      state.isLoggedIn = true
      state.userInfo = info
    },
    logout: (state) => {
      localStorage.removeItem('villageToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.isLoggedIn = false
      state.success = false
    },
  },
  extraReducers: {
    [loginAction.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [loginAction.fulfilled]: (state, payload) => {
      state.loading = false
      state.userInfo = payload.payload
      state.isLoggedIn = true
      state.loginOpen = false
    },
    [loginAction.rejected]: (state, payload) => {
      state.loading = false
      state.error = payload.payload.error
    },
  },
})

export const authAction = loginSlice.actions

export default loginSlice;