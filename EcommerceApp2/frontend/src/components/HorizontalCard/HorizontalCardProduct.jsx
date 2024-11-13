import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import Context from "../context";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import axios from "axios";

const HorizontalCardProduct = ({ category, heading }) => {
  console.log("Category: " + category);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  // const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    // fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/product/get-category-namewise-product",
        { category },
        {
          "content-type": "application/json",
        }
      );
      setLoading(false);
      setData(data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // setLoading(true);
    // const categoryProduct = await fetchCategoryWiseProduct(category);
    // setLoading(false);

    // console.log("horizontal data", categoryProduct.data);
    // setData(categoryProduct?.data);
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
        className="flex items-center gap-4 md:gap-6 overflow-scroll no-scrollbar transition-all"
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
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : loadingList.map((product, index) => {
              return (
                <Link
                  // to={"product/" + product?._id}
                  className="w-full bg-red-500 rounded-lg shadow flex"
                >
                  <div class="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:border-slate-400 hover:shadow-lg transition-all duration-200 items-center justify-center">
                    <a
                      class="relative mx-1 mt-2 min-w-[208px] min-h-[208px] max-w-[208px] max-h-[208px]  flex items-center justify-center overflow-hidden rounded-xl"
                      href="#"
                    >
                      <img
                        class="object-cover w-full bg-blue-100 h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                        src="https://res.cloudinary.com/dgsey2kim/image/upload/v1731429200/pegskt1ad8y6zhnxnl7p.webp"
                        alt="product image"
                      />
                      <span class="absolute top-0 left-0 m-2 rounded-full bg-green-600 px-2 text-center text-xs font-medium text-white">
                        39% OFF
                      </span>
                    </a>

                    <div class="mt-4 px-3 pb-3">
                      <a href="#">
                        <h5 class="text-xs md:text-[16px] font-semibold tracking-tight text-slate-900 line-clamp-2">
                          Nike Air MX Super 2500 - Red
                        </h5>
                      </a>
                      <div class="mt-2 mb-5 flex items-center justify-between">
                        <p>
                          <span class="text-lg md:text-xl font-bold text-slate-900">
                            $449
                          </span>
                          <span class="text-[12px] md:text-sm text-slate-500 line-through ml-2">
                            $699
                          </span>
                        </p>
                        <div class="flex items-center">
                          <svg
                            class="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                            5.0
                          </span>
                        </div>
                      </div>
                      <a
                        href="#"
                        class="w-52 flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to cart
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
