import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-[#FC7B00] hover:bg-orange-600 px-4 py-2 rounded-md text-sm font-medium"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
