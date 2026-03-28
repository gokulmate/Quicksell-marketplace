import React, { useState } from "react";
import db from "../../db.json";

const Categories = () => {
  // ✅ db.json madhun categories kadhto
  const dbProducts = Array.isArray(db) ? db : db.products;

  // Category wise count + products
  const categoryData = [...new Set(dbProducts.map((p) => p.category))].map(
    (cat) => ({
      name: cat,
      count: dbProducts.filter((p) => p.category === cat).length,
      products: dbProducts.filter((p) => p.category === cat),
    })
  );

  // ✅ localStorage madhun added categories
  const [customCategories, setCustomCategories] = useState(
    JSON.parse(localStorage.getItem("customCategories") || "[]")
  );

  const [newCategory, setNewCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Emoji map
  const categoryEmoji = {
    mobile: "📱",
    laptop: "💻",
    electronics: "🎧",
    fashion: "👗",
    furniture: "🪑",
  };

  // ✅ New category add kar
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Category name bhara!");
      return;
    }
    const exists = [...categoryData, ...customCategories].find(
      (c) => c.name.toLowerCase() === newCategory.toLowerCase()
    );
    if (exists) {
      alert("He category already ahe!");
      return;
    }
    const newCat = {
      name: newCategory.toLowerCase().trim(),
      count: 0,
      products: [],
      custom: true,
    };
    const updated = [...customCategories, newCat];
    setCustomCategories(updated);
    localStorage.setItem("customCategories", JSON.stringify(updated));
    setNewCategory("");
    setShowForm(false);
  };

  // ✅ Custom category delete kar
  const handleDelete = (name) => {
    const updated = customCategories.filter((c) => c.name !== name);
    setCustomCategories(updated);
    localStorage.setItem("customCategories", JSON.stringify(updated));
  };

  const allCategories = [...categoryData, ...customCategories];

  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500 text-sm">
            {allCategories.length} total categories
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-sm"
        >
          + Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">New Category</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              placeholder="Category name lihih... (e.g. books)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
            />
            <button
              onClick={handleAddCategory}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {allCategories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {categoryEmoji[cat.name] || "📦"}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800 capitalize">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {cat.count} products
                  </p>
                </div>
              </div>
              {cat.custom && (
                <button
                  onClick={() => handleDelete(cat.name)}
                  className="text-red-400 hover:text-red-600 text-xs bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg transition"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full"
                style={{
                  width: `${
                    cat.count > 0
                      ? (cat.count / dbProducts.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            {/* Product thumbnails */}
            {cat.products && cat.products.length > 0 && (
              <div className="flex gap-1 mt-3">
                {cat.products.slice(0, 4).map((p) => (
                  <img
                    key={p.id}
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/40")
                    }
                  />
                ))}
                {cat.products.length > 4 && (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                    +{cat.products.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-700 mb-3">📊 Summary</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-medium">Category</th>
              <th className="text-left py-2 text-gray-500 font-medium">Products</th>
              <th className="text-left py-2 text-gray-500 font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((cat) => (
              <tr key={cat.name} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-2 capitalize font-medium text-gray-800">
                  {categoryEmoji[cat.name] || "📦"} {cat.name}
                </td>
                <td className="py-2 text-gray-600">{cat.count}</td>
                <td className="py-2">
                  {cat.custom ? (
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                      Custom
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
                      System
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Categories;