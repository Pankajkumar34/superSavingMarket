import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/auth.slice"
import statsSlice from "./slice/stats.slice"
const store = configureStore({
    reducer:{
        auth:AuthReducer,
        stats:statsSlice
    }
})

export default store