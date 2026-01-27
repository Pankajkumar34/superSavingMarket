import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { PraviteRoute } from "./praivateRoute";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const {  authUser } = useSelector(state => state.auth)
  console.log(authUser,"authUserauthUser")
  const [userDtls, setUserDtls] = useState({})
  useEffect(() => {
    setUserDtls(authUser)
  }, [])
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader userDtls={authUser} />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 bg-white">
          <PraviteRoute>
            <Outlet />
          </PraviteRoute>


        </div>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
