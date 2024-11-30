import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOut from "../pages/Auth/LogOut";
import UserContext from "../context/userContext";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header2 = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const { cartProductCount } = useContext(UserContext);

  const searchInput = useLocation(); // get URL search input (object format)
  const URLSearch = new URLSearchParams(searchInput?.search); // get search actual input
  const searchQuery = URLSearch.getAll("q"); // get search value after queary ("q")
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="w-full fixed h-16 shadow-md bg-white z-50">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <Link to="/">
          <Logo w={90} h={50} />
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none"
            value={search}
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <LuSearch />
          </div>
        </div>

        <div className="flex gap-7 items-center justify-center">
          <div className="relative group flex justify-center">
            <div className="text-3xl cursor-pointer">
              {user?.avatar ? (
                <img
                  src={user.avatar.url}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border text-[8px]"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>

            <div className="absolute whitespace-nowrap bottom-0 top-7 h-fit pt-2 hidden  group-hover:block">
              <div className="bg-white h-fit shadow-lg rounded p-2 ">
                <nav>
                  <Link
                    to="/admin-panel"
                    className="p-2 hover:bg-slate-100 hover:text-[#4d4747] duration-200"
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* Add To Cart Total count */}
          {/* <Link to="/view-cart" className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            {user?.name && (
              <div className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 text-xs flex justify-center items-center rounded-full text-white">
                {cartProductCount}
              </div>
            )}
          </Link> */}

          <Link to="/view-cart">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartProductCount} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>

          <div className="px-3 py-1 rounded-full uppercase cursor-pointer text-white bg-red-600 hover:bg-red-700">
            {user?.name ? (
              <button>
                <LogOut />
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;
