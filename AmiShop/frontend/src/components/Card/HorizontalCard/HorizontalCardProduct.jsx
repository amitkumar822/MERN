import React, { useContext, useEffect, useRef, useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddToCart from "../../../helpers/AddToCart";
import userContext from "../../../context/userContext.js";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import API from "../../../api/axiosInstance.js";

const HorizontalCardProduct = ({ category, heading }) => {
  const { fetchCountAddToCart } = useContext(userContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await API.post(
        "/product/get-category-namewise-product",
        { category },
        { "content-type": "application/json" }
      );

      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };


  const handleAddToCart = async (event, id) => {
    await AddToCart(event, id);
    fetchCountAddToCart();
  };

  return (
    <div className="w-full mx-auto px-4 -mt-4 mb-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll no-scrollbar px-2"
        style={{ scrollBehavior: "smooth" }}
        ref={scrollElement}
      >
        {/* Scroll Left Button */}
        <Button
          onClick={scrollLeft}
          variant="contained"
          className="z-[2] bg-white md:block hidden"
          sx={{
            position: "absolute",
            top: "8rem",
            left: "1.2rem",
            transform: "translateX(-50%) rotate(-90deg)",
            bgcolor: "white",
            display: { xs: "none", md: "block" },
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>
        
        {/* Scroll Right Button */}
        <Button
          onClick={scrollRight}
          variant="contained"
          className="z-[2]"
          sx={{
            position: "absolute",
            top: "8rem",
            right: "1.2rem",
            transform: "translateX(50%) rotate(90deg)",
            bgcolor: "white",
            display: { xs: "none", md: "block" },
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>

        {loading
          ? loadingList?.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="text-slate-500 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium bg-slate-200 animate-pulse rounded-full"></p>
                    <p className="text-slate-500 line-through bg-slate-200 animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-sm text-white bg-slate-200 animate-pulse rounded-full w-full"></button>
                </div>
              </div>
            ))
          : data?.map((product, index) => (
              <Link key={index}>
                <div className="relative flex overflow-hidden rounded-lg transition-all duration-200 w-[21.5rem] h-[11.5rem]">
                  <div className="rounded-lg shadow-md shadow-gray-600 flex justify-center items-center overflow-hidden border m-1 bg-gray-200">
                    <div
                      className="relative min-w-[173px] max-h-[180px] h-full flex justify-center items-center rounded-l-lg overflow-hidden bg-blue-200"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img
                        className="object-cover h-full mix-blend-multiply transition-transform duration-300 ease-in-out transform"
                        src={
                          hoveredIndex === index
                            ? product?.productImage[1]?.url
                            : product?.productImage[0]?.url
                        }
                        alt="product image"
                      />
                      <span
                        className={`absolute top-0 left-0 m-2 rounded-full px-2 text-center text-xs font-medium text-white ${
                          product.discountPercentage >= 50
                            ? "bg-green-600"
                            : product.discountPercentage >= 20
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                      >
                        {product?.discountPercentage}% OFF
                      </span>

                      {/* Hover icons */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                          hoveredIndex === index
                            ? "opacity-100 bg-[rgba(0,0,0,0.2)]"
                            : "opacity-0"
                        }`}
                      >
                        <FaHeart className="text-white hover:text-red-500 text-2xl" />
                        <FaEye className="text-white hover:text-green-500 text-2xl" />
                      </div>
                    </div>

                    <div className="p-2 flex flex-col justify-between h-full">
                      <div className="flex flex-col gap-2 ">
                        <div>
                          <p className="text-sm font-semibold text-gray-600 uppercase">
                            {product?.brand}
                          </p>
                        </div>
                        <p className="text-xs md:text-base text-slate-900 line-clamp-2 capitalize">
                          {product?.productName}
                        </p>
                        <p>
                          <span className="text-xs md:text-base font-semibold text-slate-900">
                          ₹{product.sellingPrice.toLocaleString()}
                          </span>
                          <span className="text-[12px] text-red-500 md:text-sm line-through ml-2">
                            {product?.price.toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={(event) =>
                            handleAddToCart(event, product?._id)
                          }
                          className="w-full flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
