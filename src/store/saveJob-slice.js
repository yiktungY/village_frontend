import { createSlice } from "@reduxjs/toolkit";

const saveJobSlice = createSlice({
  name: "saveJob",
  initialState: {
    jobsList: [],
    totalQuantity: 0,
    totalApplied: 0,
  },
  reducers: {
    addToList(state, action) {
      const newJob = action.payload;
      const existingJob = state.jobsList.find((job) => job.post_id === newJob.post_id)
      if (!existingJob) {
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
      }

    }
  }
})

export const saveJobActions = saveJobSlice.actions

export default saveJobSlice;