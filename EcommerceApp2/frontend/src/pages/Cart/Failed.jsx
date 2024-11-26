import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white">
      {/* Failure Icon */}
      <div className="bg-white rounded-full shadow-lg p-6 flex items-center justify-center mb-6">
        <FaTimesCircle className="w-16 h-16 text-red-500" />
      </div>

      {/* Failure Message */}
      <div className="text-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
        <h1 className="text-4xl font-bold text-red-400">Payment Failed</h1>
        <p className="text-gray-300 mt-4">
          Unfortunately, your payment could not be processed. Please try again or contact support if the issue persists.
        </p>

        {/* Buttons for Retry and Home */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/view-cart")}
            className="btn btn-error text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 active:scale-95 focus:outline-none"
          >
            Retry Payment
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-secondary text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 active:scale-95 focus:outline-none"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failed;
