import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default RootLayout;
