import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

const Success = () => {
  const [query] = useSearchParams();
  const transactionId = query.get("payment_id");
  const transactionRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    if (transactionRef.current) {
      navigator.clipboard.writeText(transactionRef.current.textContent);
      setCopySuccess(true);

      // Reset copy success message after 2 seconds
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      {/* Success Icon */}
      <div className="bg-white rounded-full shadow-lg p-6 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-16 h-16 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Success Message */}
      <div className="text-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
        <h1 className="text-4xl font-bold text-green-400">Payment Successful!</h1>
        <p className="text-gray-300 mt-4">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>

        {/* Transaction ID */}
        {transactionId && (
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-400">
              Transaction ID:
            </p>
            <div className="flex items-center justify-center mt-2">
            <span
                ref={transactionRef}
                className="text-green-400 text-xl font-bold bg-gray-800 px-4 py-2 rounded-lg shadow-inner select-all"
              >
                {transactionId}
              </span>
              <button
                onClick={handleCopy}
                className="ml-3 p-2 bg-gray-700 text-green-400 rounded-lg shadow-lg hover:bg-gray-600 active:scale-95 focus:outline-none"
                title="Copy Transaction ID"
              >
                <FaCopy className="w-5 h-5" />
              </button>
            </div>
            {/* Copy success message */}
            {copySuccess && (
              <p className="text-sm text-green-500 mt-2">
                Transaction ID copied to clipboard!
              </p>
            )}
          </div>
        )}

        {/* Back to Home Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="btn btn-primary mt-8"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
