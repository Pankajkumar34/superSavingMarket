import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../axios.config";
const axiosInstance = axiosConfig()

export const loginHandler = createAsyncThunk("/type/login", async (userData, { rejectWithValue }) => {
    try {

        const res = await axiosInstance.post("/dashboard/login", userData)
        // console.log(res,"==> api")

        return res.data.body.user


    } catch (error) {
        console.log(error, "-->")
        return rejectWithValue(error)
    }
})

export const authHandler = createAsyncThunk("/type/auth/check", async (userData, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/dashboard/auth/check")
        return res.data.body
    } catch (error) {
        console.log(error, "-->")
        return rejectWithValue(error)
    }
})


export const fileUploader=async(formData)=>{
try {
    const res = await axiosInstance.post("/upload",formData)
    console.log(res,"res")
    return res.data
} catch (error) {
    console.log(error,"==>")
}
}