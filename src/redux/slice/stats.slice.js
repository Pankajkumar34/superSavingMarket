import { createSlice } from "@reduxjs/toolkit";
import { getStats } from "../../utils/thunkApis/stats.apis";
const initialState = {
    userStats: null,
    loading: false,
    error: ""
}

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userStats= action.payload
        },
        removeUser:(state, action) => {
            state.userStats= null
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStats.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStats.fulfilled, (state, action) => {
                state.loading = false;
                state.userStats = action.payload;
            })
            .addCase(getStats.rejected, (state, action) => {
                console.log(action.payload.response.data.message, "===action.payloadkk")
                state.loading = false;
                state.error = action.payload.response.data.message || "Login failed";
            });

           
    }


})

export const { setUser,removeUser } = statsSlice.actions
export default statsSlice.reducer