import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../axios.config";
const axiosInstance = axiosConfig()

export const getStats= createAsyncThunk("/type/user-stats",async(_,{rejectWithValue})=>{
try {
    const res = await axiosInstance.get("/super-admin/stats")
    console.log(res.data.data,"res==stats")
    return res.data.data
} catch (error) {
    return rejectWithValue(error)
}
})