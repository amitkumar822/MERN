import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext.js";
import { useSelector } from "react-redux";
import LogOut from "../../pages/Auth/LogOut";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../../data/logo.png";
import { ROLE } from "../../common/Role";
import scrollTop from "../../helpers/scrollTop";
import useDebounce from "../../hook/useDebounce.jsx";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);

  if (user?.refreshToken) {
    localStorage.setItem("token", user?.refreshToken);
  } else {
    setTimeout(() => {
      localStorage.clear();
    }, 3000);
  }

  const token = localStorage.getItem("token");

  const { cartProductCount } = useContext(userContext);

  const searchInput = useLocation(); // get URL search input (object format)
  const URLSearch = new URLSearchParams(searchInput?.search); // get search actual input
  const searchQuery = URLSearch.getAll("q"); // get search value after query ("q")
  const [search, setSearch] = useState(searchQuery);

  // debounce search input to prevent multiple requests
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      navigate(`/search?q=${debouncedSearch}`);
    } else {
      navigate("/");
    }
  }, [debouncedSearch]);

  return (
    <div className="w-full mx-auto">
      <div className="navbar px-4 fixed z-50 bg-base-100 border border-b-2 max-h-12">
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="AmiShop" className="w-14 h-14 md:ml-20" />
          </Link>
        </div>
        <div className="flex-none gap-2 md:mr-14">
          {/* Search Input */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Cart Box */}
          <Link
            to="/view-cart"
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {cartProductCount}
              </span>
            </div>
          </Link>

          {/*** Profile and Login Section */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full flex justify-center items-center">
                {user?.avatar?.url ? (
                  <img
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="w-10 rounded-full border text-[8px]"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <FaRegCircleUser className="text-4xl" />
                  </div>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              onClick={scrollTop}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className={`${user?.name ? "block" : "hidden"}`}>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li
                className={`${user?.role === ROLE.ADMIN ? "block" : "hidden"}`}
              >
                <Link to="/admin-panel">Admin Panel</Link>
              </li>
              <li className={`${user?.name ? "block" : "hidden"}`}>
                <Link to="/order">Order</Link>
              </li>
              <li>{token ? <LogOut /> : <Link to="/login">Login</Link>}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
