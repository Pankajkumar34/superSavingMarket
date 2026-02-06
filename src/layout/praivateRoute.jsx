
import { Navigate } from "react-router";

import { useSelector } from "react-redux";


export const PraviteRoute = ({ children }) => {
  const { user,loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const isAuth = sessionStorage.getItem("isAuthenticated") === "true";
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated && !isAuth) {
    return <Navigate to="/signin" replace />;
  }
 return children;

  
};