import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const DashboardLayouts = () => {
  return (
    <div>
      Wassup!!
      <Outlet></Outlet>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayouts;
