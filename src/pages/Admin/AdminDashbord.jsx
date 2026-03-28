import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../../db.json";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  // ✅ db.json madhun stats kadhto
  const products = Array.isArray(db) ? db : db.products;
  const totalProducts = products.length;

  const categories = [...new Set(products.map((p) => p.category))];
  const totalCategories = categories.length;

  const avgRating = (
    products.reduce((sum, p) => sum + parseFloat(p.rating || 0), 0) /
    totalProducts
  ).toFixed(1);

  const mostExpensive = products.reduce((max, p) =>
    parseFloat(p.price) > parseFloat(max.price) ? p : max
  );

  const cheapest = products.reduce((min, p) =>
    parseFloat(p.price) < parseFloat(min.price) ? p : min
  );

  // Category wise count
  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: products.filter((p) => p.category === cat).length,
  }));

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <div className="p-4">

      {/* Welcome + Logout */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            👋 Welcome, {loggedUser?.name || "Admin"}!
          </h1>
          <p className="text-gray-500 text-sm">E-Market Admin Dashboard</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-500 font-medium">Total Products</p>
          <h2 className="text-3xl font-bold text-blue-700">{totalProducts}</h2>
          <p className="text-xs text-blue-400 mt-1">db.json madhye</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-500 font-medium">Categories</p>
          <h2 className="text-3xl font-bold text-green-700">{totalCategories}</h2>
          <p className="text-xs text-green-400 mt-1">Unique categories</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-500 font-medium">Avg Rating</p>
          <h2 className="text-3xl font-bold text-yellow-700">⭐ {avgRating}</h2>
          <p className="text-xs text-yellow-400 mt-1">All products</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm text-purple-500 font-medium">Top Price</p>
          <h2 className="text-2xl font-bold text-purple-700">
            ${mostExpensive.price}
          </h2>
          <p className="text-xs text-purple-400 mt-1 truncate">{mostExpensive.name}</p>
        </div>

      </div>

      {/* Category Breakdown + Recent Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Category Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-3">
            📦 Category Breakdown
          </h3>
          <div className="flex flex-col gap-2">
            {categoryCounts.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 capitalize w-24">
                  {cat.name}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${(cat.count / totalProducts) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-6 text-right">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-3">
            💰 Price Range
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Cheapest Product</p>
                <p className="font-semibold text-gray-800 text-sm">{cheapest.name}</p>
              </div>
              <span className="text-green-600 font-bold">${cheapest.price}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Most Expensive</p>
                <p className="font-semibold text-gray-800 text-sm">{mostExpensive.name}</p>
              </div>
              <span className="text-red-500 font-bold">${mostExpensive.price}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Products Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-700">🛒 Recent Products</h3>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-semibold px-3 py-1.5 rounded-lg"
          >
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">#</th>
                <th className="text-left py-2 text-gray-500 font-medium">Product</th>
                <th className="text-left py-2 text-gray-500 font-medium">Category</th>
                <th className="text-left py-2 text-gray-500 font-medium">Price</th>
                <th className="text-left py-2 text-gray-500 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 8).map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="py-2 text-gray-400">{index + 1}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 rounded-lg object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/40")}
                      />
                      <span className="font-medium text-gray-800 truncate max-w-32">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-2 font-semibold text-gray-800">
                    ${product.price}
                  </td>
                  <td className="py-2 text-yellow-500">
                    ⭐ {product.rating || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;