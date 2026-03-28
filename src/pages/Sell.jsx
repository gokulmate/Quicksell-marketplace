import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaTag,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";

const useAuth = () => {
  const isLoggedIn = localStorage.getItem("loggedUser") !== null;
  return { isLoggedIn };
};

const categories = [
  "Bikes",
  "Cars",
  "Mobiles",
  "Electronics",
  "Furniture",
  "Fashion",
  "Books",
  "Pets",
  "Real Estate",
  "Services",
  "Cameras",
  "Music",
];

const conditions = ["Brand New", "Like New", "Good", "Fair", "For Parts"];

export default function SellPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ FIX 1: loading state added
  const [error, setError] = useState("");         // ✅ FIX 2: error state added
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    condition: "",
    location: "",
    name: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Not logged in screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login Required
          </h2>
          <p className="text-gray-500 mb-6">
            To sell your item, please log in first or create an account.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Sign Up
            </button>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ FIX 3: Image upload — store as base64 so it can be sent to server
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (images.length >= 6) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result].slice(0, 6));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIX 4: handleSubmit with proper error handling and correct POST body
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ FIX 5: Safe JSON parse of loggedUser
      let loggedUser = null;
      try {
        loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      } catch {
        loggedUser = null;
      }

      const payload = {
        ...form,
        price: Number(form.price), // ✅ FIX 6: price as number not string
        images: images,            // ✅ FIX 7: images array included in POST
        image: images[0] || "",    // ✅ FIX 8: first image as main image
        seller: {                  // ✅ FIX 9: seller object structured correctly
          name: form.name,
          phone: form.phone,
          id: loggedUser?.id || null,
        },
        sellerId: loggedUser?.id || null,
        rating: 0,
        status: "active",          // ✅ FIX 10: status "active" so it shows on homepage
        timestamp: new Date().toISOString(),
      };

      console.log("Posting product:", payload); // debug log

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Ad post nahi hua. Server check karo ya dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Ad Posted Successfully!
          </h2>
          <p className="text-gray-500 mb-6">
            Your ad is now live. Buyers can view it now.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setForm({
                  category: "",
                  title: "",
                  description: "",
                  price: "",
                  condition: "",
                  location: "",
                  name: "",
                  phone: "",
                });
                setImages([]);
                setError("");
              }}
              className="flex-1 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Post New Ad
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Post Your Ad</h1>
          <p className="text-gray-500 text-sm mt-1">Sell your item — free!</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {["Category", "Details", "Contact"].map((s, i) => (
            <React.Fragment key={i}>
              <div
                className={`flex items-center gap-2 ${
                  step > i + 1
                    ? "text-green-600"
                    : step === i + 1
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 
                  ${
                    step > i + 1
                      ? "border-green-500 bg-green-50"
                      : step === i + 1
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < 2 && (
                <div
                  className={`flex-1 h-0.5 ${
                    step > i + 1 ? "bg-green-400" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ✅ FIX 11: Show error message if POST fails */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3 text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

            {/* ── STEP 1: Category ── */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaTag className="inline mr-2 text-blue-500" />
                    Select Category *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setForm({ ...form, category: cat })}
                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition
                          ${
                            form.category === cat
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-blue-300 text-gray-600"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!form.category}
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </>
            )}

            {/* ── STEP 2: Ad Details ── */}
            {step === 2 && (
              <>
                {/* Photos */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCamera className="inline mr-2 text-blue-500" />
                    Photos (max 6)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setImages(images.filter((_, j) => j !== i))
                          }
                          className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {images.length < 6 && (
                      <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 text-gray-400 hover:text-blue-400 transition">
                        <FaCamera size={18} />
                        <span className="text-xs mt-1">Add</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImages}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Ad Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Honda Activa 6G 2022 — Excellent Condition"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Item ke baare mein detail mein likhein — condition, age, reason for selling..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <FaRupeeSign className="inline mr-1 text-blue-500" /> Price *
                  </label>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
                    <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm border-r">
                      ₹
                    </span>
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Condition *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {conditions.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setForm({ ...form, condition: c })}
                        className={`py-1.5 px-3 rounded-full border text-sm transition
                          ${
                            form.condition === c
                              ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                              : "border-gray-300 text-gray-600 hover:border-blue-300"
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
                    Location *
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    disabled={
                      !form.title ||
                      !form.price ||
                      !form.condition ||
                      !form.location ||
                      !form.description
                    }
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 3: Contact Details ── */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
                    <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm border-r">
                      +91
                    </span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Review Summary */}
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1 border">
                  <p><span className="font-semibold">Category:</span> {form.category}</p>
                  <p><span className="font-semibold">Title:</span> {form.title}</p>
                  <p><span className="font-semibold">Price:</span> ₹{form.price}</p>
                  <p><span className="font-semibold">Condition:</span> {form.condition}</p>
                  <p><span className="font-semibold">Location:</span> {form.location}</p>
                  <p><span className="font-semibold">Photos:</span> {images.length} uploaded</p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!form.name || !form.phone || loading}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {/* ✅ FIX 12: Show loading state on submit button */}
                    {loading ? "Posting..." : "🚀 Post Ad"}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}