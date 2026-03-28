import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Optional navigation

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: "",
    features: {
      ram: "",
      storage: "",
      camera: "",
      battery: ""
    },
    seller: {
      name: "",
      phone: "",
      email: "",
      location: "Pune"
    }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        rating: Number(formData.rating) || 0,
        features: Object.fromEntries(
          Object.entries(formData.features).filter(([_, v]) => v)
        )
      };

      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          // navigate('/products'); // Go back to products
          window.location.reload(); // Refresh to see new product
        }, 2000);
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      alert('❌ Error: ' + error.message + '\nMake sure JSON Server is running!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Add New Product
          </h1>
          <p className="text-xl text-gray-600">Add to db.json instantly</p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  placeholder="iPhone 15 Pro Max"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all"
                  placeholder="99999"
                  required
                />
              </div>
            </div>

            {/* Category & Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500"
                  placeholder="Mobile, Laptop, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500"
                  placeholder="4.8"
                />
              </div>
            </div>

            {/* Image & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-500"
                  placeholder="Short description..."
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">Features</label>
              <div className="grid grid-cols-2 gap-4">
                <input name="features.ram" value={formData.features.ram} onChange={handleInputChange} placeholder="RAM (8GB)" className="p-3 border rounded-lg" />
                <input name="features.storage" value={formData.features.storage} onChange={handleInputChange} placeholder="Storage (256GB)" className="p-3 border rounded-lg" />
                <input name="features.camera" value={formData.features.camera} onChange={handleInputChange} placeholder="Camera (48MP)" className="p-3 border rounded-lg" />
                <input name="features.battery" value={formData.features.battery} onChange={handleInputChange} placeholder="Battery (5000mAh)" className="p-3 border rounded-lg" />
              </div>
            </div>

            {/* Seller Details */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">Seller Details</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="seller.name" value={formData.seller.name} onChange={handleInputChange} placeholder="Shop Name" className="p-3 border rounded-lg" required />
                <input name="seller.phone" value={formData.seller.phone} onChange={handleInputChange} placeholder="+91 9876543210" className="p-3 border rounded-lg" required />
                <input name="seller.email" value={formData.seller.email} onChange={handleInputChange} placeholder="shop@email.com" className="p-3 border rounded-lg" required />
                <input name="seller.location" value={formData.seller.location} onChange={handleInputChange} placeholder="Pune" className="p-3 border rounded-lg" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-8 rounded-xl font-bold text-xl transition-all transform ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-xl hover:shadow-2xl'
              } text-white`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fill="none" stroke="currentColor" strokeWidth="4" d="M12 2v6" strokeDasharray="16 16" strokeDashoffset="16">
                      <animate attributeName="stroke-dashoffset" values="16;0" keyTimes="0;1" dur="1s" fill="freeze" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  Adding to db.json...
                </span>
              ) : (
                "🚀 Add Product Now"
              )}
            </button>
          </form>

          {/* Success Message */}
          {success && (
            <div className="mt-8 p-6 bg-green-100 border-2 border-green-300 rounded-2xl text-center">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Product Added Successfully!</h3>
              <p className="text-green-700">Added to db.json - Refresh products page to see</p>
            </div>
          )}
        </div>

        {/* JSON Server Status */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
          <p className="font-semibold text-yellow-800">
          
          </p>
        </div>
      </div>
    </div>
  );
}
