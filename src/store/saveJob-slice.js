import { createSlice } from "@reduxjs/toolkit";

const savedJSON = localStorage.getItem('savedJobList');
const savedJobList = JSON.parse(savedJSON)
const initialState = {
  jobsList: savedJobList === null ? [] : savedJobList.jobsList,
  totalQuantity: savedJobList === null ? 0 : savedJobList.totalQuantity,
  totalApplied: 0,
  action: ""
}
const saveJobSlice = createSlice({
  name: "saveJob",
  initialState,
  reducers: {
    addToList(state, action) {
      const newJob = action.payload;
      const existingJob = state.jobsList.findIndex((job) => job.post_id === newJob.post_id)
      if (existingJob >= 0) {
        state.jobsList.splice(existingJob, 1)
        state.totalQuantity--
      } else {
        state.jobsList.push({
          post_id: newJob.post_id,
          displayName: newJob.displayName,
          updated_at: newJob.updated_at,
          title: newJob.title,
          type: newJob.type,
          status: newJob.status,
          avatar_url: newJob.avatar_url,
          saved: true

        })
        state.totalQuantity++
      }
      const storeObject = JSON.stringify(state)
      window.localStorage.setItem("savedJobList", storeObject)
    }
  }
})

export const saveJobActions = saveJobSlice.actions

export default saveJobSlice;