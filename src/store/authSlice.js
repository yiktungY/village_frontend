import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {

    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer