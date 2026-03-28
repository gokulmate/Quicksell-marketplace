import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

// Admin Creditionals - hardcoded (db.json madhye users nahi mhanun)
const ADMIN = {
  id: "admin01",
  name: "Admin",
  email: "admin@shop.com",
  password: "admin123",
  role: "admin",
};

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError(""); // error clear kar

    // Basic validation
    if (!email || !password) {
      setError("Email ani password reqiure");
      return;
    }

    //  STEP 1 Admin check kara
    if (email === ADMIN.email && password === ADMIN.password) {
      localStorage.setItem("loggedUser", JSON.stringify(ADMIN));
      navigate("/admin"); // admin dashboard la ja
      return;
    }

    //   step 2 Registered users 
    // madhye check kara (localStorage)
    const regUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );
    const foundUser = regUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      navigate("/"); // home return
    } else {
      setError("Wrong email or password!");
    }
  };

  // Enter key press support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-500">E-Market</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-3 py-2 bg-red-50 border border-red-300 rounded-md">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <span className="text-sm text-blue-600 cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md mb-3"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

     {/*login*/}
        <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-50">
          <FcGoogle size={22} className="mr-2" />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-4">
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
