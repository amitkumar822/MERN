import React from "react";
import "./ProductCard.css";

const Card = ({ product }) => {
  return (
    <div data-aos="zoom-in">
      <div className="productCard w-[20rem] m-4 transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="h-[220px] w-full bg-blue-100  flex items-center justify-center">
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
            <p className="font-bold text-gray-600 uppercase">
              {product?.brand}
            </p>
            <p className="text-lg font-semibold text-gray-800 truncate">
              {product?.productName}
            </p>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center mt-2 space-x-3">
            <p className="text-xl font-bold text-green-600">
              ₹{product?.sellingPrice.toLocaleString()}
            </p>
            <p className="line-through text-gray-400">
              ₹{product?.price.toLocaleString()}
            </p>
            <p className="text-sm text-green-500 font-semibold">
              {product?.discountPercentage}% off
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-3 text-sm text-gray-500">
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
