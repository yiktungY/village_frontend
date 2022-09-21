import { configureStore, createSlice } from "@reduxjs/toolkit"
import signUpSlice from "./signUp-slice";
import loginSlice from "./login-slice";
import saveJobSlice from "./saveJob-slice";



const store = configureStore({
    reducer: {
        signUp: signUpSlice.reducer,
        login: loginSlice.reducer,
        saveJob: saveJobSlice.reducer,
    }
})

export default store;