import React from "react";
import Logo from "./Logo";
import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full fixed h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <Link to="/">
          <Logo w={90} h={50} />
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <LuSearch />
          </div>
        </div>

        <div className="flex gap-7 items-center justify-center">
          <div className="text-3xl cursor-pointer">
            <FaRegCircleUser />
          </div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 text-sm flex justify-center items-center rounded-full text-white">
              0
            </div>
          </div>

          <div>
            <Link to="/login" className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
