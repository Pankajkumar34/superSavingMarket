import React, { useEffect } from "react";
import BasicTables from "./Tables/BasicTables";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../utils/thunkApis/auth.api";

const UserList =()=>{
        const dispatch = useDispatch()
      const {userList}= useSelector(state=>state.stats)
      console.log(userList,"===>pp")
  const fetchList = async () => {
    try {
      const res = await dispatch(getUserList("USER"))

    } catch (error) {
      console.log(error, "==>")
    }
  }
  
  useEffect(() => {
    fetchList()
  }, [])

    return(
        <>
        <BasicTables tableData={userList} title="Franchises List"/>
        </>
    )
}

export default UserList