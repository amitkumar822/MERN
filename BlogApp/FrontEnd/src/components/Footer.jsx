import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 pt-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {/* Products */}
          <div>
            <h3 className="font-bold text-gray-900 text-center md:text-left">Products</h3>
            <ul className="mt-4 space-y-2 text-center md:text-left">
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Flutter</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">React</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Android</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">iOS</a>
              </li>
            </ul>
          </div>

          {/* Design to code */}
          <div>
            <h3 className="font-bold text-gray-900 text-center md:text-left">Design to code</h3>
            <ul className="mt-4 space-y-2 text-center md:text-left">
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Figma plugin</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Templates</a>
              </li>
            </ul>
          </div>

          {/* Comparison */}
          <div>
            <h3 className="font-bold text-gray-900 text-center md:text-left">Comparison</h3>
            <ul className="mt-4 space-y-2 text-center md:text-left">
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs Anima</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs Appsmith</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs FlutterFlow</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs Monday Hero</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs Retool</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs Bubble</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">DhiWise vs Figma Dev Mode</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-gray-900 text-center md:text-left">Company</h3>
            <ul className="mt-4 space-y-2 text-center md:text-left">
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">About Us</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Contact Us</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Career</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Terms of Service</a>
              </li>
              <li className="text-gray-600 hover:text-gray-900">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Lower or bottom footer */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-300 mt-6 py-4 px-4">
        <div className="text-xl font-semibold mb-4 md:mb-0 text-center md:text-left">
          Ami<span className="text-blue-500 font-bold">Blog</span>
        </div>
        <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
          <p>&copy; 2024 Ami PVT. LTD All rights reserved</p>
        </div>
        <div className="flex justify-center md:justify-start space-x-4">
          <a href="https://github.com/amitkumar822" className="text-gray-600 hover:text-gray-900">
            <FaGithub className="text-2xl" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <BsYoutube className="text-2xl" />
          </a>
          <a href="https://www.linkedin.com/in/amit-kumar-a4687b21a" className="text-gray-600 hover:text-gray-900">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
