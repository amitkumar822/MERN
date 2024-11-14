import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import displayINRCurrency from "../../../helpers/displayINRCurrency";

const VerticalCard = ({ category, heading }) => {
  const [isHovered, setIsHovered] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
      console.log(data?.data);

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

  return (
    <div className="container mx-auto px-4 -mt-4 mb-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll no-scrollbar"
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
              <Link>
                <div className="relative flex w-[320px] h-[420px] max-w-[320px] flex-col overflow-hidden rounded-lg shadow-xl transition-all duration-300 items-center justify-center p-1">
                  <div className="rounded-lg shadow-md pt-1 shadow-gray-500 flex justify-center items-center flex-col w-full overflow-hidden">
                    <div
                      className="relative w-full h-[220px] flex items-center justify-center overflow-hidden rounded-t-lg"
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <img
                        className={`w-full h-full object-contain transition-transform duration-500 ease-in-out mix-blend-multiply ${
                          isHovered === index ? "scale-105" : "scale-100"
                        }`}
                        src={
                          isHovered === index
                            ? product?.productImage[1]?.url
                            : product?.productImage[0]?.url
                        }
                        alt="product image"
                      />
                      <span
                        className={`absolute top-2 left-2 rounded-full px-3 py-1 text-center text-xs font-medium text-white ${
                          product.discountPercentage >= 50
                            ? "bg-green-600"
                            : product.discountPercentage >= 20
                            ? "bg-pink-600"
                            : "bg-red-600"
                        }`}
                      >
                        {product?.discountPercentage}% OFF
                      </span>

                      {/* Hover icons */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                          isHovered === index
                            ? "opacity-100 bg-[rgba(0,0,0,0.3)]"
                            : "opacity-0"
                        }`}
                      >
                        <FaHeart className="text-white hover:text-red-500 text-2xl transition-transform duration-200 ease-in-out transform hover:scale-110" />
                        <FaEye className="text-white hover:text-green-500 text-2xl transition-transform duration-200 ease-in-out transform hover:scale-110" />
                      </div>
                    </div>

                    <div className="mt-4 px-3 pb-3 w-full text-center">
                      <h5 className="text-base font-semibold tracking-tight text-slate-900 line-clamp-2">
                        {product?.productName}
                      </h5>

                      {/* Reviews section */}
                      <div className="flex items-center justify-center gap-1 mt-2 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${
                              i < product.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.13c.969 0 1.371 1.24.588 1.81l-3.34 2.428a1 1 0 00-.364 1.118l1.286 3.946c.3.921-.755 1.688-1.54 1.118l-3.34-2.428a1 1 0 00-1.176 0l-3.34 2.428c-.785.57-1.84-.197-1.54-1.118l1.286-3.946a1 1 0 00-.364-1.118L2.63 9.373c-.783-.57-.38-1.81.588-1.81h4.13a1 1 0 00.95-.69l1.286-3.946z" />
                          </svg>
                        ))}
                        <span className="text-xs font-medium text-slate-700 ml-2">
                          ({product?.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="mt-2 mb-5 flex items-center justify-center gap-3">
                        <span className="text-lg font-semibold text-slate-900">
                          {displayINRCurrency(product?.price)}
                        </span>
                        <span className="text-xs text-red-500 line-through">
                          {displayINRCurrency(product.sellingPrice)}
                        </span>
                      </div>
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5"
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
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCard;
