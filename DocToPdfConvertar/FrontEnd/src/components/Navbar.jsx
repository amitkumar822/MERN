// src/components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <h1 className="text-white text-lg font-semibold">
          DOCX to PDF Converter
        </h1>

        {/* Links */}
        <div className="flex space-x-6">
          <a href="/" className="text-white hover:text-blue-200">
            Home
          </a>
          <a href="/upload" className="text-white hover:text-blue-200">
            Upload
          </a>
          <a href="/about" className="text-white hover:text-blue-200">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
