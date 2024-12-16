import React from "react";
import { Link } from "react-router-dom";
import scrollTop from "../../helpers/scrollTop";
import displayINRCurrency from "../../helpers/displayINRCurrency";

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden md:w-72"
    >
      <Link to={`/product/${product?._id}`} onClick={scrollTop}>
        <div className="relative h-40 bg-gray-50 flex justify-center items-center">
          <img
            src={product?.productImage[0]?.url}
            alt={product?.productName}
            className="object-contain h-full w-full py-2 transition-transform duration-300 hover:scale-110 mix-blend-darken"
          />
        </div>
        <div className="p-4 space-y-2">
          <h2 className="font-bold text-base text-gray-800 truncate">
            {product?.productName}
          </h2>
          <p className="text-sm text-gray-600 capitalize">
            {product?.category}
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-lg font-semibold text-blue-600">
              {displayINRCurrency(product?.sellingPrice)}
            </p>
            {product?.price && (
              <p className="text-sm text-gray-400 line-through">
                {displayINRCurrency(product?.price)}
              </p>
            )}
            {product?.discountPercentage && (
              <p className="text-sm font-medium text-green-500">
                {product?.discountPercentage}% off
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2 md:flex-row">
        <button
        //   onClick={(e) => handleAddToCart(e, product?._id)}
          className="w-full md:w-1/2 text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md shadow hover:from-green-600 hover:to-green-700 transition-colors"
        >
          Add to Cart
        </button>
        <button className="w-full md:w-1/2 text-sm font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 rounded-md shadow hover:from-yellow-600 hover:to-yellow-700 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;