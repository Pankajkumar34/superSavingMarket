
import axios from "axios"
const axiosConfig=()=>{
    const instance = axios.create({
        baseURL:"http://localhost:4000/api",
        withCredentials:true,
        headers:{
            Authorization:""
        }
    })
    return instance
}

export default axiosConfig