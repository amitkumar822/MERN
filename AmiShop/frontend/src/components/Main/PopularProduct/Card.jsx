import React from "react";
import "./ProductCard.css";
import { FaArrowDown } from "react-icons/fa";

const Card = ({ product }) => {
  return (
    <div data-aos="zoom-in">
      <div className="productCard lg:w-[17.2rem] w-[10.6rem] md:m-1 mt-4 transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:h-[220px] h-[155px] w-full bg-blue-100  flex items-center justify-center">
          <img
            className="h-full w-full object-contain p-2 mix-blend-darken"
            src={product?.productImage[0]?.url}
            alt={product?.productName}
          />
        </div>

        {/* Text Section */}
        <div className="textPart bg-white p-4">
          {/* Brand and Name */}
          <div>
            <p className="md:text-sm text-xs font-semibold text-gray-600 uppercase">
              {product?.brand}
            </p>
            <p className="md:text-base text-xs text-gray-800 line-clamp-2">
              {product?.productName}
            </p>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center md:mt-2 mt-1 md:space-x-3 space-x-1">
            <p className="md:text-base text-xs font-bold text-green-600">
              ₹{product?.sellingPrice.toLocaleString()}
            </p>
            <p className="line-through md:text-sm text-[8px] text-gray-400">
              ₹{product?.price.toLocaleString()}
            </p>
            <p className="md:text-xs text-[8px] text-green-500 font-semibold flex justify-center items-center gap-1">
              {product?.discountPercentage}%{" "}
              <FaArrowDown className="text-base text-blue-500 animate-bounce" />
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-1 md:text-sm text-[8px] text-gray-500">
            <p>RAM: {product?.ram}</p>
            <p>Storage: {product?.ssd}</p>
            <p>Display: {product?.displaySize}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
