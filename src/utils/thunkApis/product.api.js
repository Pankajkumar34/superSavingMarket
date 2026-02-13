import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../axios.config";
const axiosInstance = axiosConfig()

export const fetchBrandList = async () => {
    try {
        const res = await axiosInstance.get("/super-admin/get-brand-list");
        console.log(res, "res==brandList")
        return res.data.body;
    } catch (error) {
        console.log(error, "==>")
    }
}

export const fetchCategoryList = async () => {
    try {
        const res = await axiosInstance.get("/super-admin/get-category-list");
        console.log(res, "res==categoryList")
        return res.data.body;
    } catch (error) {
        console.log(error, "==>")
    }
}

export const fetchCatalogTree = async () => {
    try {
        const res = await axiosInstance.get(`/super-admin/catalog-tree`);
        console.log(res, "res==catalogTree")
        return res.data.body;
    }

    catch (error) {
        console.log(error, "==>")
    }

}

export const getProductList = async (cursor) => {
  try {
    const res = await axiosInstance.get(`/super-admin/get-product-list?limit=20&cursor=${cursor?cursor:""}`);
  return res.data;
  } catch (error) {
    console.log(error, "==>")
  }
};