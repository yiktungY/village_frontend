import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { username, email, password },
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

  },
)