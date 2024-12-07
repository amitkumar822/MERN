import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import displayINRCurrency from "../../../helpers/displayINRCurrency";
import AddToCart from "../../../helpers/AddToCart";
import UserContext from "../../../context/userContext";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/product/get-category-namewise-product",
        { category },
        { "content-type": "application/json" }
      );

      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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

  const { fetchCountAddToCart } = useContext(UserContext);

  const handleAddToCart = async (event, id) => {
    await AddToCart(event, id);
    fetchCountAddToCart();
  };

  return (
    <div className="container mx-auto px-4 -mt-4 mb-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll no-scrollbar px-2"
        style={{ scrollBehavior: "smooth" }}
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((_, index) => (
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
          : data.map((product, index) => (
              <Link key={index}>
                <div className="relative flex overflow-hidden rounded-lg transition-all duration-200 w-[21.5rem] h-[11.5rem]">
                  <div className="rounded-lg shadow-md shadow-gray-600 flex justify-center items-center overflow-hidden border m-1 bg-gray-200">
                    <div
                      className="relative min-w-[173px] max-w-[180px] max-h-[180px] rounded-l-lg overflow-hidden"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img
                        className="object-cover bg-blue-100 mix-blend-multiply min-w-3 transition-transform duration-300 ease-in-out transform"
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

                    <div className="px-2 pb-2">
                      <h5 className="text-xs md:text-[15px] font-semibold tracking-tight text-slate-900 line-clamp-2 capitalize">
                        {product?.productName}
                      </h5>
                      <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span className="text-xs md:text-[16px] font-semibold text-slate-900">
                            {displayINRCurrency(product.sellingPrice)}
                          </span>
                          <span className="text-[12px] text-red-500 md:text-sm line-through ml-2">
                            {displayINRCurrency(product?.price)}
                          </span>
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={(event) => handleAddToCart(event, product?._id)}
                          className="w-36 flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
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
