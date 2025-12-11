import React from "react";

import { Navigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../hooks/useRole";
// import useAuth from "../hooks/useAuth";
// import { Navigate, useLocation } from "react-router";
// import LoadingSpinner from "../Components/LoadingSpinner";

const AdminRoute = ({ children }) => {
  //   const { user, loading } = useAuth();
  //   const location = useLocation();

  const [role, isRoleLoading] = useRole();

  console.log(location);
  if (isRoleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (!role === "admin") {
    return <Navigate state={location.pathname} to={"/"}></Navigate>;
  }
  return children;
};

export default AdminRoute;
