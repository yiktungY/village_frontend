import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobInfo: {},
  jobID: "",
  loading: false,
  success: false,
  error: ""
}

const jobDetailsSlice = createSlice({
  name: "jobDetails",
  initialState: initialState,
  reducers: {
    getJobID(state, action) {
      state.jobID = action.payload;
    },
    getJobDetails(state, action) {
      state.jobInfo = action.payload;
      state.success = true
    }
  }
})

export const jobDetailsActions = jobDetailsSlice.actions

export default jobDetailsSlice;