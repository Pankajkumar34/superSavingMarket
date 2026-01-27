import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import axiosConfig from "../utils/axios.config";
import Cookies from "js-cookie"
import { useSelector } from "react-redux";
export const PraviteRoute = ({ children }) => {
    const axiosInstance = axiosConfig()
    const { loading, isAuthenticated, authUser } = useSelector(state => state.auth)   

    if (loading) return <p>Checking auth...</p>;
    return (
        <>
            {isAuthenticated ? children : <Navigate to="/signin" />}
        </>
    )
};