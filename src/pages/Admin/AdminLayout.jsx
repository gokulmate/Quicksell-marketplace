import React from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import Navbar from "../../Components/Navbar";
import { Outlet, Navigate } from "react-router-dom";
import Footer from "../../Components/Footer";

export default function AdminLayout() {

  //  localStorage madhun user 
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  //  Login nahi kela tar — Login page la pathav
  if (!loggedUser) {
    return <Navigate to="/login" />;
  }

  //  Admin nahi tar — Home la pathav
  if (loggedUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  //  Admin ahe tar — Admin panel dikahv
  return (
    <div className="flex flex-col">
   {/* <Navbar/> */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
        
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}