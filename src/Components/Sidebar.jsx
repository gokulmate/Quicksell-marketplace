import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaAngleDown,
  FaAngleUp,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const [productsMenuOpen, setProductsMenuOpen] = useState(true);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center p-2 rounded hover:bg-gray-700 transition ${
      isActive ? "bg-gray-700 text-yellow-400" : ""
    }`;

  //  Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">

      <div className="p-4 font-bold text-xl border-b border-gray-700 text-yellow-400">
        Admin Panel
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {/* Dashboard to view all  */}
        <NavLink to="/admin" end className={linkClass}>
          <FaTachometerAlt className="mr-2" /> Dashboard
        </NavLink>

        {/* Products Dropdown */}
        <div>
          <button
            onClick={() => setProductsMenuOpen(!productsMenuOpen)}
            className="flex items-center w-full p-2 rounded hover:bg-gray-700 justify-between transition"
          >
            <span className="flex items-center">
              <FaBoxOpen className="mr-2" /> Products
            </span>
            {productsMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>

          {productsMenuOpen && (
            <div className="ml-6 mt-1 space-y-1">
              {/* /admin/products → /admin/all-products */}
              <NavLink to="/admin/all-products" className={linkClass}>
                All Products
              </NavLink>
              <NavLink to="/admin/add-product" className={linkClass}>
                Add Product
              </NavLink>
               {/*  DELETE LINK */}
    <NavLink to="/delete-products" className={linkClass}>
                 🗑️ Delete Products
              </NavLink>
            </div>
          )}
        </div>

      </nav>

      {/* ✅ Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-2 bg-red-600 rounded hover:bg-red-700 transition font-medium"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}