import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
  const { blog } = useAuth();

  const [show, setShow] = useState();

  return (
    <>
      <nav className="shadow-lg px-4 py-3">
        <div className="flex items-center justify-between container mx-auto">
          <div className="font-semibold text-xl">
            Ami<span className="text-blue-500">Blog</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex">
            <ul className="flex space-x-6 uppercase">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-600">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/creators" className="hover:text-blue-600">
                  Creators
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Toggle Button */}
          <div onClick={() => setShow(!show)} className="md:hidden">
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
          </div>

          <div className="space-x-2 hidden md:flex">
            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold duration-300 px-4 py-2 rounded"
            >
              DASHBOARD
            </Link>

            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-800 text-white font-semibold duration-300 px-4 py-2 rounded"
            >
              LOGIN
            </Link>
          </div>
        </div>

        {/* mobile navbar */}
        {show && (
          <div className="bg-white">
            <ul className="flex flex-col h-screen text-xl font-bold items-center justify-center md:hidden space-y-6 uppercase">
              <li className="w-full flex items-center justify-center">
                <Link to="/" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li className="w-full flex items-center justify-center">
                <Link to="/blogs" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-600">
                  Blogs
                </Link>
              </li>
              <li className="w-full flex items-center justify-center">
                <Link to="/creators" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-600">
                  Creators
                </Link>
              </li>
              <li className="w-full flex items-center justify-center">
                <Link to="/about" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-600">
                  About
                </Link>
              </li>
              <li className="w-full flex items-center justify-center">
                <Link to="/contact" onClick={() => setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
