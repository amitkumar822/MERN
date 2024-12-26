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
    <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(180px,250px))] justify-center gap-4 p-4">
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-36 bg-gray-400 flex justify-center items-center"></div>
              <div className="p-3 space-y-3">
                <div className="h-4 bg-gray-500 rounded-md"></div>
                <div className="h-3 bg-gray-500 rounded-md"></div>
                <div className="flex space-x-3">
                  <div className="h-3 bg-gray-500 rounded-md w-1/2"></div>
                  <div className="h-3 bg-gray-500 rounded-md w-1/2"></div>
                </div>
                <div className="h-6 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden"
            >
              <Link to={`/product/${product?._id}`} onClick={scrollTop}>
                <div className="relative h-36 pt-2 bg-gray-100 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]?.url}
                    alt={product?.productName}
                    className="object-contain h-full w-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-sm font-semibold text-blue-900 capitalize bg-blue-100 px-2 rounded-full">
                    {product?.brand}
                  </span>
                  <p className=" text-base text-gray-900 line-clamp-2">
                    {product?.productName}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold text-blue-600">
                    ₹{product?.sellingPrice.toLocaleString()}
                    </p>
                    {product?.price && (
                      <p className="text-xs text-gray-500 line-through">
                        {product?.price.toLocaleString()}
                      </p>
                    )}
                    {product?.discountPercentage && (
                      <p className="text-xs font-semibold text-green-500">
                        {product?.discountPercentage}% off
                      </p>
                    )}
                  </div>
                </div>
              </Link>
              <div className="p-3 flex gap-2">
                <button
                  onClick={(e) => handleAddToCart(e, product?._id)}
                  className="w-1/2 text-xs font-medium bg-gradient-to-r from-green-500 to-green-600 text-white py-1 rounded-md shadow hover:from-green-600 hover:to-green-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button className="w-1/2 text-xs font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-1 rounded-md shadow hover:from-yellow-600 hover:to-yellow-700 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SearchVerticalCart;
