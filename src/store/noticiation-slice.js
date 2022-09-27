import { createSlice } from "@reduxjs/toolkit";

const noticiationSlice = createSlice({
  name: "noticiation",
  initialState: { context: "" },
  reducers: {
    showMessage(state, action) {
      const message = action.payload;
      state.context = message
    },
    hideMessage(state) {
      state.context = ""
    }
  }
})

export const noticiationActions = noticiationSlice.actions

export default noticiationSlice;