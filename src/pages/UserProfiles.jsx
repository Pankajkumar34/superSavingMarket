import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosConfig from "../utils/axios.config";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authHandler } from "../utils/thunkApis/auth.api";
import { removeUser } from "../redux/slice/auth.slice";
export default function UserProfiles() {
  const axiosInstance = axiosConfig()
  const dispatch = useDispatch()
  const { authUser } = useSelector(state => state.auth)
  const [userDtls, setUserDtls] = useState({})
  const navigate = useNavigate()
  const logOuthandler = async () => {
    try {
      const res = await axiosInstance.post("/dashboard/logout")
      if (res.status === 200) {
        toast.success("Logout Successfully")
         await dispatch(removeUser())
        setTimeout(() => {
        sessionStorage.setItem("isAuthenticated",false)
          navigate("/signin")
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb userDtls={authUser} pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex justify-between items-center">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Profile
          </h3>
          <button className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={logOuthandler}>Logout</button>
        </div>

        <div className="space-y-6">
          <UserMetaCard userDtls={authUser} />
          <UserInfoCard userDtls={authUser} />
          <UserAddressCard userDtls={authUser} />
        </div>
      </div>
    </>
  );
}
