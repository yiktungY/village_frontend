import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const signUpAction = createAsyncThunk(
  "user/signUp",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { username, email, password },
      )
      if (response.status === 200) {
        localStorage.setItem("villageToken", response.data.token)
        return response.data.user
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (error) {
      console.log("Error", error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)


export const loginAction = createAsyncThunk(
  "user/signUp",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
      )
      if (response.status === 200) {
        localStorage.setItem("villageToken", response.data.token)
        return response.data.user
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)