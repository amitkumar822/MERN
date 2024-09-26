import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function EcommerceFooter() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Customer Service */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Order Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Delivery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sustainability</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Affiliate Program</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Men's Clothing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Women's Clothing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Kids' Clothing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Accessories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shoes</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <p className="text-gray-400 mb-4">Stay connected through our social channels.</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm">© 2024 E-Shop. All Rights Reserved.</p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            <a href="#" className="text-white hover:underline">Privacy Policy</a> | 
            <a href="#" className="text-white hover:underline"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default EcommerceFooter;
