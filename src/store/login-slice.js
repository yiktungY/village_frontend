import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loginOpen: false,
  userInfo: {},
  userToken: null,
  signUpError: null,
  signUpSuccess: false,
  isLoggedIn: false
}
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    openForm(state) {
      state.loginOpen = !state.loginOpen
    }
  },
  extraReducers: {

  },
})

export const loginActions = loginSlice.actions

export default loginSlice;