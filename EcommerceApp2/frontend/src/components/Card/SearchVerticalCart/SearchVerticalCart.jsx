import React, { useContext } from "react";
import scrollTop from "../../../helpers/scrollTop";
import { Link } from "react-router-dom";
import AddToCart from "../../../helpers/AddToCart";
import UserContext from "../../../context/userContext";
import displayINRCurrency from "../../../helpers/displayINRCurrency";

const SearchVerticalCart = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchCountAddToCart } = useContext(UserContext);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchCountAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll no-scrollbar transition-all p-3">
      {loading
        ? loadingList.map((product, index) => (
            <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-gradient-to-b from-gray-50 to-gray-200 rounded-xl shadow-lg">
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse rounded-t-xl"></div>
              <div className="p-4 grid gap-3">
                <h2 className="font-semibold text-lg text-black animate-pulse rounded-md bg-gray-300 h-6"></h2>
                <p className="capitalize text-gray-500 animate-pulse rounded-md bg-gray-300 h-4"></p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium animate-pulse rounded-md bg-gray-300 w-1/2 h-4"></p>
                  <p className="text-gray-400 line-through animate-pulse rounded-md bg-gray-300 w-1/2 h-4"></p>
                </div>
                <button className="text-sm bg-gray-300 text-gray-500 px-3 py-2 rounded-full animate-pulse"></button>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              to={`/product/${product?._id}`}
              className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] overflow-hidden bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              onClick={scrollTop}
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center rounded-t-xl">
                <img
                  src={product?.productImage[0]?.url}
                  className="object-scale-down h-full hover:scale-110 transition-transform mix-blend-multiply rounded-lg"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-semibold text-lg md:text-xl text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-gray-500">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-500 font-bold text-lg">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-gray-400 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button className="text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded-full shadow-sm transition-colors">
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default SearchVerticalCart;
