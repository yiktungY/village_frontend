import { configureStore, createSlice } from "@reduxjs/toolkit"
import authSlice from "./auth-slice";
import saveJobSlice from "./saveJob-slice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        saveJob: saveJobSlice.reducer
    }
})

export default store;