import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Background circles */}
      <div className="absolute w-72 h-72 bg-blue-100 rounded-full -top-16 -left-16 opacity-50" />
      <div className="absolute w-52 h-52 bg-red-100 rounded-full -bottom-10 -right-10 opacity-50" />

      {/* 404 Text */}
      <h1 className="text-9xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
        4<span className="text-red-500">0</span>4
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Page Not Found
      </h2>

      {/* Subtitle */}
      <p className="mt-3 text-gray-500 text-base max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-red-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-red-300"
        >
          🏠 Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-1"
        >
          ← Go Back
        </button>
      </div>

      {/* Bottom hint */}
      <p className="mt-10 text-sm text-gray-400">
        Lost? Go back to{" "}
        <span
          onClick={() => navigate("/")}
          className="text-red-500 cursor-pointer hover:underline font-medium"
        >
          Homepage
        </span>
      </p>
    </div>
  );
}