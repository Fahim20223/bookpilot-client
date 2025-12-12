import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Sidebar from "../Dashboard/Sidebar/Sidebar";

const DashboardLayouts = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      {/* Right Side: Dashboard Dynamic Content */}
      <div className="flex-1  md:ml-64">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayouts;
