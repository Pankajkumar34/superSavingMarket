import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { useEffect, useState } from "react";
import axiosConfig from "./utils/axios.config";
import { useDispatch,useSelector } from "react-redux";
import { authHandler } from "./utils/thunkApis/auth.api";
  import { ToastContainer } from 'react-toastify';
import CreateAccount from "./pages/createAccout";

export default function App() {
  const [loading, setLoading] = useState(true);
  const {authUser} = useSelector(state =>state.auth)
  const [auth, setAuth] = useState(false);
const dispatch = useDispatch()
  const axiosInstance = axiosConfig()

  const fetch = async () => {
    try {
      const res = await dispatch(authHandler())
      console.log(res, "==>resres")
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      console.log(message);
      setAuth(false);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetch()
  }, [dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}

          <Route element={<AppLayout auth={auth}/>}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
<Route path="/create-account" element={<CreateAccount/>}/>
            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={authUser? <Navigate to="/" />:<SignIn />} />
          {/* <Route path="/signin" element={<SignIn />} /> */}
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
       <ToastContainer />
    </>
  );
}
