import React, { useState } from "react";

const navLinks = [
  "Bikes",
  "Cars",
  "Mobiles",
  "Electronics",
  "Furniture",
  "Fashion",
  "Books",
  "Pets"
];

const Header = () => {
  const [search, setSearch] = useState("");
  const [location] = useState("Pune, Maharashtra");
  const [activeNav, setActiveNav] = useState("Bikes");

  return (
    <div className="w-full font-sans">

      {/* Main Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3 max-w-7xl mx-auto">

          {/* Logo */}
          <div className="flex items-center">
            <span className="bg-[#002f34] text-white font-black px-2 py-1 rounded-l">
              OLX
            </span>
            <span className="bg-[#23e5db] w-2 h-8 rounded-r"></span>
          </div>

          {/* Location */}
          <div className="hidden md:block border px-3 py-2 rounded">
            {location}
          </div>

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 border px-3 py-2 rounded"
          />

          {/* Sell Button */}
          <button className="border px-4 py-2 rounded-full font-bold">
            SELL
          </button>
        </div>
      </div>

      {/* Category Nav */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto px-4">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link)}
              className={`px-4 py-2 ${
                activeNav === link
                  ? "border-b-2 border-black font-bold"
                  : "text-gray-500"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Header;