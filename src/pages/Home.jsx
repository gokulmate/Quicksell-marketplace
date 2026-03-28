import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import ComparisonTable from "../Components/ComparisionTable";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaFire,
  FaStar,
  FaArrowRight,
  FaTags,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CATEGORIES = [
  "all",
  "mobile",
  "laptop",
  "electronics",
  "fashion",
  "furniture",
];

const CATEGORY_META = {
  all: { emoji: "🛍️", label: "All" },
  mobile: { emoji: "📱", label: "Mobile" },
  laptop: { emoji: "💻", label: "Laptop" },
  electronics: { emoji: "🔌", label: "Electronics" },
  fashion: { emoji: "👗", label: "Fashion" },
  furniture: { emoji: "🛋️", label: "Furniture" },
};

const BANNERS = [
  {
    bg: "from-blue-600 to-indigo-700",
    tag: "🔥 Hot Deal",
    title: "Latest Smartphones",
    sub: "Up to 30% off on top brands",
    btn: "Shop Now",
    cat: "mobile",
  },
  {
    bg: "from-emerald-500 to-teal-700",
    tag: "✨ New Arrivals",
    title: "Fashion Forward",
    sub: "Trending styles this season",
    btn: "Explore",
    cat: "fashion",
  },
  {
    bg: "from-orange-500 to-red-600",
    tag: "⚡ Flash Sale",
    title: "Electronics Mega Sale",
    sub: "Laptops, gadgets & more",
    btn: "Grab Now",
    cat: "electronics",
  },
];

const TRUST_BADGES = [
  { icon: <FaTruck />, title: "Free Delivery", sub: "On orders above ₹500" },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payment",
    sub: "100% safe transactions",
  },
  { icon: <FaStar />, title: "Top Rated", sub: "Trusted by 10L+ users" },
  { icon: <FaHeadset />, title: "24/7 Support", sub: "We're always here" },
];

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [compareList, setCompareList] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bannerIdx, setBannerIdx] = useState(0);

  // Read search query from URL (Navbar search navigate karta hai yahan)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("query");
    if (q) {
      setSearch(q);
      setCategory("all");
    } else {
      setSearch(""); //  URL se query hat jaye toh search bhi clear ho
    }
  }, [location.search]);

  // Fetch products with correct response structure handling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:3000/products");
// handel the both format [] {}
        const data = response.data;
        if (Array.isArray(data)) {
          setProduct(data);
        } else if (data && Array.isArray(data.products)) {
          setProduct(data.products);
        } else {
          setProduct([]);
          console.warn("Unexpected API response format:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Data not fetching");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto-rotate banner
  useEffect(() => {
    const t = setInterval(
      () => setBannerIdx((i) => (i + 1) % BANNERS.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  //  Filter using both p.name and p.title (handles both field names )
  const filteredProducts = product.filter((p) => {
    const productName = (p.name || p.title || "").toLowerCase();
    const matchesSearch = productName.includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleCompare = (product) => {
    if (compareList.find((p) => p.id === product.id)) return;
    if (compareList.length >= 4) {
      alert("Maximum 4 products compare");
      return;
    }
    setCompareList([...compareList, product]);
  };

  const removeProduct = (id) =>
    setCompareList(compareList.filter((p) => p.id !== id));

  const banner = BANNERS[bannerIdx];

  return (
    <>
      <div
        className="min-h-screen bg-gray-50"
        style={{ fontFamily: "'Segoe UI', sans-serif" }}
      >
        {/* Navbar */}
        <Navbar />

        {/* HERO BANNER */}
        <div
          className={`bg-linear-to-r ${banner.bg} text-white transition-all duration-700`}
        >
          <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                {banner.tag}
              </span>
              <h1 className="text-4xl font-black mt-3 mb-2 leading-tight">
                {banner.title}
              </h1>
              <p className="text-white/80 text-lg mb-5">{banner.sub}</p>
              <button
                onClick={() => setCategory(banner.cat)}
                className="flex items-center gap-2 bg-white text-gray-800 font-bold px-6 py-3 rounded-full hover:scale-105 transition shadow-lg"
              >
                {banner.btn} <FaArrowRight size={14} />
              </button>
            </div>

            {/* Banner dots */}
            <div className="flex gap-2 md:flex-col">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBannerIdx(i)}
                  className={`rounded-full transition-all ${
                    i === bannerIdx
                      ? "bg-white w-8 h-3"
                      : "bg-white/40 w-3 h-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TRUST BADGES */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100"
            >
              <div className="text-blue-600 text-xl">{b.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{b.title}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CATEGORY PILLS */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaTags className="text-blue-500" /> Browse Categories
            </h2>
            <button
              onClick={() => navigate("/categories")}
              className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              View All <FaArrowRight size={11} />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm capitalize transition-all ${
                  category === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-500"
                }`}
              >
                <span>{CATEGORY_META[cat]?.emoji}</span>
                {CATEGORY_META[cat]?.label || cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FaFire className="text-orange-500" />
              {search
                ? `Results for "${search}"`
                : category === "all"
                ? "Featured Products"
                : `${CATEGORY_META[category]?.label} Products`}
              {!loading && (
                <span className="text-sm font-normal text-gray-400">
                  ({filteredProducts.length} items)
                </span>
              )}
            </h2>

            {/* ✅ Show reset button when search is active */}
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  navigate("/"); // ✅ URL bhi clear karo
                }}
                className="text-sm text-red-500 hover:underline"
              >
                ✕ Clear Search
              </button>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100"
                />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-4 text-sm">
              ⚠️ {error} — Please check your server connection.
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onCompare={handleCompare}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-3">🔍</div>
                  <p className="text-lg font-medium">product not found</p>
                  <p className="text-sm mt-1">
                  category  new try 
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                      navigate("/"); // 
                    }}
                    className="mt-4 text-blue-600 text-sm hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* COMPARISON TABLE */}
        {compareList.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              ⚖️ Compare Products
              <span className="text-sm font-normal text-gray-400">
                ({compareList.length}/4)
              </span>
            </h2>
            <ComparisonTable
              selectedProducts={compareList}
              removeProduct={removeProduct}
            />
          </div>
        )}

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}