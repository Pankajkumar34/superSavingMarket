import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../axios.config";
const axiosInstance = axiosConfig()

export const fetchBrandList=()=>{
    try {
        const res = axiosInstance.get("/brand/list");
        return res.data;
    } catch (error) {
        console.log(error, "==>")
    }
}