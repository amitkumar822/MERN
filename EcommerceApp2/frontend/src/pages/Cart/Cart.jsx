import React, { useContext, useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import AddToCart from "../../helpers/AddToCart";
import UserContext from "../../context/userContext";

const Cart = ({ category, heading }) => {
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

      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error(
        "VerticalCardError: ",
        error?.response?.data?.message || error
      );
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
    <>
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
            ? loadingList.map((_, index) => <SkeletonLoading key={index} />)
            : data.map((product, index) => (
                <Link
                  to={"product/" + product?._id}
                  key={product?.productName + index}
                >
                  <div className="rounded-lg w-80 border border-gray-200 bg-white p-6 shadow-sm">
                    <div
                      className="h-56 flex justify-center"
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <img
                        className="mx-auto h-full"
                        src={
                          isHovered === index
                            ? product?.productImage[1]?.url
                            : product?.productImage[0]?.url
                        }
                        alt="Product Image"
                      />
                    </div>

                    <div className="pt-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {product?.discountPercentage}% off
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <span className="sr-only">Quick look</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                              />
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          >
                            <span className="sr-only">Add to Favorites</span>
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                strokeWidth="2"
                                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <h1 className="text-xl font-semibold leading-tight text-gray-900 hover:underline line-clamp-2">
                        {product?.productName}
                      </h1>

                      <div className="mt-2 flex items-center gap-2">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className="h-4 w-4 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                          </svg>
                        ))}
                        <p className="text-sm font-medium text-gray-900">4.9</p>
                        <p className="text-sm font-medium text-gray-500">
                          (1,233)
                        </p>
                      </div>

                      <div className="mt-4 w-full">
                        <div className="mt-2 mb-5">
                          <span className="text-lg md:text-xl font-semibold text-slate-900">
                            {displayINRCurrency(product?.price)}
                          </span>{" "}
                          <span className="text-xs text-red-500 line-through">
                            {displayINRCurrency(product.sellingPrice)}
                          </span>
                        </div>

                        <button
                          onClick={(event) =>
                            handleAddToCart(event, product?._id)
                          }
                          type="button"
                          className="w-full flex justify-center items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <svg
                            className="-ms-2 me-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                            />
                          </svg>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
};

export default Cart;

const SkeletonLoading = () => (
  <div className="rounded-lg w-80 border border-gray-200 bg-white p-6 shadow-sm">
    <div className="h-56 flex justify-center">
      <img
        className="mx-auto h-full"
        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
        alt="Product Image"
      />
    </div>

    <div className="pt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className=" bg-gray-400 min-h-4 min-w-16 skeleton"></span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="sr-only">Quick look</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <span className="sr-only">Add to Favorites</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <h1 className="bg-gray-400 min-h-10 line-clamp-2 skeleton "></h1>

      <div className="mt-2 min-h-4 bg-gray-400 skeleton"></div>

      <div className="mt-4 w-full">
        <div className="mt-2 mb-5">
          <div className="min-h-7 bg-gray-400 skeleton"></div>
          <span className="text-xs text-red-500 line-through"></span>
        </div>

        <div className="min-h-8 bg-gray-400 skeleton"></div>
      </div>
    </div>
  </div>
);
