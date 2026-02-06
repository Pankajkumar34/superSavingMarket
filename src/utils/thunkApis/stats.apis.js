import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../axios.config";
const axiosInstance = axiosConfig()

export const getStats = createAsyncThunk("/type/user-stats", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/super-admin/stats")
        console.log(res.data.data, "res==stats")
        return res.data.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message || "Failed to fetch account details")
    }
})

export const fetchAccountDetails = createAsyncThunk(
  "account/fetchDetails",
  async ( id ,{ rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/super-admin/get-account-details?id=${id}`
      );

      return res.data?.accountData[0];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch account details"
      );
    }
  }
);