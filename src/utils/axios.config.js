
import axios from "axios"
const axiosConfig=()=>{
    const instance = axios.create({
        // baseURL:"http://localhost:4000/api",
        baseURL:"https://supersavingapis.onrender.com/api",
        withCredentials:true,
        headers:{
            Authorization:""
        }
    })
    return instance
}

export default axiosConfig