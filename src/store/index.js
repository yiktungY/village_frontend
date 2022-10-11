import { configureStore, createSlice } from "@reduxjs/toolkit"
import signUpSlice from "./signUp-slice";
import loginSlice from "./login-slice";
import saveJobSlice from "./saveJob-slice";
import noticiationSlice from "./noticiation-slice"
import jobDetailsSlice from "./jobDetails-slice"


const store = configureStore({
    reducer: {
        signUp: signUpSlice.reducer,
        login: loginSlice.reducer,
        saveJob: saveJobSlice.reducer,
        noticiation: noticiationSlice.reducer,
        jobDetails: jobDetailsSlice.reducer
    }
})

export default store;