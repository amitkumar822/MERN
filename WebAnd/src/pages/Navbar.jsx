import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaBriefcase,
  FaLaptopCode,
  FaInfoCircle,
  FaPhoneAlt,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../data/logo/logo-weband.jpg"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Detect scroll direction
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        setIsScrolled(true); // Hide top contact section
      } else if (scrollTop < lastScrollTop) {
        setIsScrolled(false); // Show top contact section
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop); // Prevent negative values
    };

    // Smooth updates with requestAnimationFrame
    const smoothScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", smoothScrollHandler);
    return () => {
      window.removeEventListener("scroll", smoothScrollHandler);
    };
  }, [lastScrollTop]);

  //^ Here dropdown menu controller
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown function
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside or inside a menu item
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 transition-transform duration-500 ease-in-out">
      {/* Top Contact Bar */}
      <div
        className={`bg-base-200 transition-transform duration-500 ease-in-out ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="md:text-sm text-xs flex justify-between items-center md:py-2 p-1 md:px-4">
          <a href="tel:+91 79799 50560" className="font-semibold flex gap-1">
            📞<span className="md:block hidden">Contact:</span> +91 79799 50560
          </a>
          {/* 24/7 Service */}
          <div className="font-semibold flex gap-1">
            🕒{" "}
            <span className="flex gap-1">
              24/7 <span className="md:block hidden"> Service Available</span>
            </span>
          </div>
          <a
            href="mailto:tech.weband@gmail.com"
            className="font-semibold flex gap-1"
          >
            📧 <span className="md:block hidden">Email:</span>{" "}
            tech.weband@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`navbar bg-base-100 shadow-md transition-transform duration-500 ease-in-out ${
          isScrolled ? "-translate-y-[2.3rem]" : "translate-y-0"
        }`}
      >

        {/* Logo */}
        <div className="flex-1 md:ml-2">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="w-12 rounded-full" />
          </Link>
        </div>
        {/* <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost md:text-2xl text-xl font-bold bg-pink-100"
          >
            <span className="text-orange-500 bg-orange-200 px-1 rounded-lg rotate-12">
              W
            </span>
            <span className="text-blue-600 bg-blue-200 px-1 rounded-lg -rotate-[30deg]">
              e
            </span>
            <span className="text-purple-600 bg-purple-200 px-1 rounded-lg -rotate-12">
              b
            </span>
            <span className="text-orange-500 bg-orange-200 px-1 rounded-lg rotate-12">
              A
            </span>
            <span className="text-purple-600 bg-purple-200 px-1 rounded-lg">
              n
            </span>
            <span className="text-blue-600 bg-blue-200 px-1 rounded-lg -rotate-[30deg]">
              d
            </span>
          </Link>
        </div> */}

        {/* Mobile Menu */}
        <div className="flex-none lg:hidden" ref={dropdownRef}>
          <div className="dropdown dropdown-end">
            <button onClick={toggleDropdown} className="btn btn-ghost">
              <FaBars className="text-xl" />
            </button>

            {isOpen && (
              <ul className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
                <li onClick={closeDropdown}>
                  <Link to="/">
                    <FaHome className="mr-2" /> Home
                  </Link>
                </li>
                <li onClick={closeDropdown}>
                  <Link to="/service">
                    <FaBriefcase className="mr-2" /> Services
                  </Link>
                </li>
                <li onClick={closeDropdown}>
                  <Link to="/portfolio">
                    <FaLaptopCode className="mr-2" /> Portfolio
                  </Link>
                </li>
                <li onClick={closeDropdown}>
                  <Link to="/about-us">
                    <FaInfoCircle className="mr-2" /> About Us
                  </Link>
                </li>
                <li onClick={closeDropdown}>
                  <Link to="/contact-us">
                    <FaPhoneAlt className="mr-2" /> Contact
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden flex-none lg:block">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/service">
                <FaBriefcase className="mr-2" /> Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio">
                <FaLaptopCode className="mr-2" /> Portfolio
              </Link>
            </li>
            <li>
              <Link to="/about-us">
                <FaInfoCircle className="mr-2" /> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us">
                <FaPhoneAlt className="mr-2" /> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
