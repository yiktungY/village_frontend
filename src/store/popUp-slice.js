import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showJobPicture: false,
  showJobApply: false,
  showLogin: false,
  showJobApply: false,
}
const popUpSlice = createSlice({
  name: "popUp",
  initialState: initialState,
  reducers: {
    showPopUp(state, action) {
      const status = action.payload;
      state[status] = !state[status]
      // if (state[status]) {
      //   state[status] = false;
      // } else {
      //   state[status] = true;
      // }
    }
  }
})

export const popUpActions = popUpSlice.actions

export default popUpSlice;