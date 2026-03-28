import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 1 Fetch from localhost:3000 ( API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(Array.isArray(data) ? data : data.products || []);
        } else {
          // Fallback to localStorage
          const savedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
          setProducts(savedProducts);
        }
      } catch (error) {
        console.error('API Error:', error);
        const savedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
        setProducts(savedProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categories 
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter logic
  const filtered = products.filter((p) => {
    const name = (p.name || p.title || '').toLowerCase();
    const matchSearch = name.includes(search.toLowerCase());
    const matchCat = selectedCategory === "all" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // 2️⃣ Delete from localhost:3000 API
  const handleDelete = async (id) => {
    if (!confirm(`Delete "${products.find(p => p.id == id)?.name || 'Product'}"?`)) return;

    try {
      // API Delete
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('✅ Deleted from API');
      }
    } catch (error) {
      console.log('API unavailable, using localStorage');
    }

    // localStorage backup
    const savedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
    const updatedSaved = savedProducts.filter((p) => p.id != id);
    localStorage.setItem("addedProducts", JSON.stringify(updatedSaved));

    // Update UI
    setProducts(products.filter((p) => p.id != id));
    alert('✅ Product deleted successfully!');
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-500 animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
          <p className="text-gray-600 text-lg">{filtered.length} products found</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            ➕ Add New Product
          </button>
          <a
            href="/delete-products"
            className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
          >
            🗑️  Delete
          </a>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 shadow-sm text-lg placeholder-gray-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 shadow-sm text-lg capitalize"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-linear-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="text-left px-8 py-5 text-gray-700 font-semibold">#</th>
                <th className="text-left px-8 py-5 text-gray-700 font-semibold">Product</th>
                <th className="text-left px-8 py-5 text-gray-700 font-semibold">Category</th>
                <th className="text-left px-8 py-5 text-gray-700 font-semibold">Price</th>
                <th className="text-left px-8 py-5 text-gray-700 font-semibold">Rating</th>
                <th className="text-left px-8 py-5 text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-gray-500">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-xl font-medium">No products found</p>
                    <p className="text-gray-400">Try different search or category</p>
                  </td>
                </tr>
              ) : (
                filtered.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 font-medium text-gray-900">{index + 1}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 shadow-md"
                          onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=64")}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 leading-tight">
                            {product.name || product.title}
                          </p>
                          {product.features && (
                            <p className="text-sm text-gray-500 mt-1">
                              {Object.values(product.features)[0] || 'N/A'}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-block bg-linear-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-800 capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{Number(product.price).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center text-yellow-500 font-semibold">
                        ⭐ {product.rating || 'N/A'}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {/* delete button*/}
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105 whitespace-nowrap flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-6 bg-blue-50 rounded-2xl text-center text-sm text-gray-600">
        <p>Total Products: {products.length} | 
          API: <code className="bg-blue-100 px-2 py-1 rounded font-mono">localhost:3000</code> | 
          <a href="/delete-products" className="text-red-600 font-semibold hover:underline ml-2"> Delete →</a>
        </p>
      </div>
    </div>
  );
};

export default AllProducts;
