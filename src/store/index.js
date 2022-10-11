import { configureStore, createSlice } from "@reduxjs/toolkit"
import signUpSlice from "./signUp-slice";
import loginSlice from "./login-slice";
import saveJobSlice from "./saveJob-slice";
import noticiationSlice from "./noticiation-slice"
import jobDetailsSlice from "./jobDetails-slice"
import popUpSlice from "./popUp-slice"

const store = configureStore({
    reducer: {
        signUp: signUpSlice.reducer,
        login: loginSlice.reducer,
        saveJob: saveJobSlice.reducer,
        noticiation: noticiationSlice.reducer,
        jobDetails: jobDetailsSlice.reducer,
        popUp: popUpSlice.reducer,
    }
})

export default store;