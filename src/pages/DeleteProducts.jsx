import React, { useState, useEffect } from "react";

export default function DeleteProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete single product
  const deleteProduct = async (productId) => {
    if (!window.confirm(`"${products.find(p => p.id === productId)?.name}" delete karna hai?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove from UI instantly
        setProducts(products.filter(p => p.id !== productId));
        setSuccess('✅ Product deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      alert('❌ Delete failed! JSON Server check karo.');
    }
  };

  // Delete all products
  const deleteAll = async () => {
    if (!window.confirm('SABHI products delete karna hai?')) return;
    
    try {
      await Promise.all(
        products.map(p => 
          fetch(`http://localhost:3001/products/${p.id}`, { method: 'DELETE' })
        )
      );
      setProducts([]);
      setSuccess('🗑️ All products deleted!');
    } catch (error) {
      alert('Error deleting all!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-xl text-red-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-linear-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🗑️ Delete Products
          </h1>
          <p className="text-xl text-gray-700">
            Total: <span className="font-bold text-red-600">{products.length}</span> products
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-auto max-w-2xl mb-8 p-6 bg-green-100 border-2 border-green-400 rounded-2xl text-center shadow-lg">
            <div className="text-3xl mb-2">{success.includes('All') ? '🗑️' : '✅'}</div>
            <div className="font-bold text-lg text-green-800">{success}</div>
          </div>
        )}

        {/* Delete All Button */}
        {products.length > 0 && (
          <div className="text-center mb-12">
            <button
              onClick={deleteAll}
              className="bg-linear-to-r from-red-500 to-red-700 text-white px-12 py-4 rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
            >
              💥 DELETE ALL ({products.length})
            </button>
          </div>
        )}

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-linear-to-r from-red-400 to-pink-400 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <span className="text-4xl font-black text-white">🗑️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">No Products Left!</h2>
            <p className="text-gray-500 text-lg">All products deleted successfully.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all border-2 border-red-100 hover:border-red-300 p-8">
                {/* Product Info */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-red-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📱</span> {/* Ya product.image use karo */}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
                    {product.name || product.title}
                  </h3>
                  <div className="text-3xl font-black text-red-600 mb-2">
                    ₹{Number(product.price || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                </div>

                {/* Seller Info */}
                {product.seller && (
                  <div className="bg-red-50 p-4 rounded-xl mb-6">
                    <p className="font-semibold text-gray-800 mb-1">👤 {product.seller.name}</p>
                    <p className="text-sm text-gray-600">📞 {product.seller.phone}</p>
                  </div>
                )}

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="w-full bg-linear-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all transform"
                >
                  ❌ DELETE THIS PRODUCT
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
