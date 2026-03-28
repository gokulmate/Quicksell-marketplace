import React, { useEffect, useState } from "react";
import { FaUserCircle, FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => console.log("Products fetched", data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSearch = () => {
   // alert("click")
    if (searchQuery.trim() === "") return;
    navigate(`/?query=${encodeURIComponent(searchQuery)}`);
  
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* ✅ FIX 1: flex items-center justify-between added */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-orange-500 transition-all duration-300 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline>
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-800 group-hover:text-blue-600 transition-colors">
            Quick
            <span className="text-blue-600 group-hover:text-orange-500">
              Sell
            </span>
          </span>
        </Link>

        {/*  : Desktop Search  */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="flex w-full border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="bg-blue-600 text-white px-4 flex items-center"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* ✅ FIX 3: Desktop Menu - aata div aatमधे ahe */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate("/categories")}
            className="px-4 py-2 border border-blue-900 rounded-md hover:bg-blue-100 transition"
          >
            All Categories
          </button>          {/* ✅ DELETE PRODUCTS BUTTON */}
          <Link to="/delete-products" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center gap-2">
             Delete
          </Link>


          <button
            onClick={() => navigate("/sell")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Sell
          </button>
          <FaUserCircle
            size={28}
            className="cursor-pointer hover:text-blue-600 transition"
            onClick={() => navigate("/profile")}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>{" "}
      {/* ✅ closing tag aata correct position var ahe */}
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2 border-t">
          <div className="flex border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="bg-blue-600 text-white px-3 flex items-center"
              onClick={handleSearch}
            >
              <FaSearch size={14} />
            </button>
          </div>
          <button
            onClick={() => {
              navigate("/categories");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-2 border border-blue-400 rounded-md text-left hover:bg-blue-50 transition"
          >
            All Categories
          </button>
          <button
            onClick={() => {
              navigate("/sell");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Sell
          </button>
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
