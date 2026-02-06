import { createSlice } from "@reduxjs/toolkit";
import { fetchAccountDetails, getStats } from "../../utils/thunkApis/stats.apis";
import { getUserList } from "../../utils/thunkApis/auth.api";
const initialState = {
    userStats: null,
    loading: false,
    error: "",
    userList:[],
    viewDetails:null
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

              // list
        builder
        .addCase(getUserList.fulfilled,(state,action)=>{
            state.userList=action.payload
        })


        builder
      .addCase(fetchAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.viewDetails = action.payload;
      })
      .addCase(fetchAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    }


})

export const { setUser,removeUser } = statsSlice.actions
export default statsSlice.reducer