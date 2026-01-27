import { createSlice } from "@reduxjs/toolkit";
import { loginHandler, authHandler } from "../../utils/thunkApis/auth.api";
const initialState = {
    user: null,
    isAuthenticated: false,
    authUser: null,
    loading: false,
    error: ""
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.authUser= action.payload
        },
        removeUser:(state, action) => {
            state.authUser= null,
            state.isAuthenticated=false,
            state.user=null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginHandler.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginHandler.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginHandler.rejected, (state, action) => {
                console.log(action.payload.response.data.message, "===action.payloadkk")
                state.loading = false;
                state.error = action.payload.response.data.message || "Login failed";
                state.isAuthenticated = false;
            });

            // auth
            builder
             .addCase(authHandler.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authHandler.fulfilled, (state, action) => {
                state.loading = false;
                state.authUser = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(authHandler.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.response.data.message || "Login failed";
                state.isAuthenticated = false;
            });
    }


})

export const { setUser,removeUser } = AuthSlice.actions
export default AuthSlice.reducer