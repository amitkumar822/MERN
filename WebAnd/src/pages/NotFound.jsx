import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Use `next/link` if using Next.js

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center text-white">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-bold mb-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
      >
        404
      </motion.h1>

      {/* Animated Message */}
      <motion.p
        className="text-2xl mb-8 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Link
          to="/" // Replace with your homepage route
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-purple-100 transition-colors shadow-lg"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Optional: Animated Illustration */}
      <motion.div
        className="mt-12"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/755/755014.png" // Replace with your own illustration
          alt="404 Illustration"
          className="w-48 h-48"
        />
      </motion.div>
    </div>
  );
};

export default NotFound;