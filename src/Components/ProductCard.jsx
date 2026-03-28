import React, { useState } from "react";

export default function ProductCard({ product, onCompare }) {
  const [showModal, setShowModal] = useState(false);

  if (!product) return null;

  //  Handle both name and title field names
  const productName = product.name || product.title || "No Name";

  //  Handle both `image` (string) and `images` (array) field names
  const productImage =
    product.image ||
    (Array.isArray(product.images) ? product.images[0] : product.images) ||
    "https://via.placeholder.com/300x200?text=No+Image";

  //  Safe seller access (seller may be missing)
  const seller = product.seller || {};

  return (
    <>
      {/* Product Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer w-64">

        {/* Product Image */}
        <div className="relative">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-48 object-cover"
            //  If image fails to load, show placeholder
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        </div>

        <div className="p-4">

          {/* Product Name and Category */}
          <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
          <p className="text-gray-500 text-sm mt-1">{product.category || "Uncategorized"}</p>

          {/* Price and Rating */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-blue-600 font-bold text-lg">
              {/*  Handle missing price */}
              ₹{product.price ?? "N/A"}
            </span>
            <span className="text-yellow-500 font-semibold">
              {/*  Handle missing rating */}
              {product.rating ? `${product.rating} ★` : "No rating"}
            </span>
          </div>

          {/* Compare button */}
          <button
            onClick={() => onCompare(product)}
            className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Compare
          </button>

          {/* Contact Seller button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-2 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
          >
            Contact Seller
          </button>
        </div>

        {/* Seller Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg w-80">
              <h2 className="text-lg font-bold mb-2">Seller Details</h2>

              <p><b>Name:</b> {seller.name || "Not available"}</p>
              <p><b>Phone:</b> {seller.phone || "Not available"}</p>
              <p><b>Email:</b> {seller.email || "Not available"}</p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}