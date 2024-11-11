import React from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import displayINRCurrency from "../helpers/displayINRCurrency";

const AdminProductCard = ({ product }) => {
  console.log(product)
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-64 m-4 transition-transform hover:scale-105">
      <div className="relative">
        <figure>
          <img
            src={product?.productImage[0]?.url}
            alt={product?.productName || "Product"}
            className="w-full h-40 object-cover"
          />
        </figure>
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
            onClick={() => onEdit(product)}
            title="Edit Product"
          >
            <MdModeEditOutline />
          </button>
          <button
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
            onClick={() => onDelete(product._id)}
            title="Delete Product"
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="p-4 capitalize">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product?.productName || "No Product Name"}
        </h2>
        <p className="text-gray-800 font-semibold mb-1">
          Brand: <span className="font-normal">{product?.brand || "N/A"}</span>
        </p>
        <p className="text-gray-800 font-semibold mb-1">
          Category:{" "}
          <span className="font-normal">{product?.category || "N/A"}</span>
        </p>
        <p className="text-gray-800 font-semibold mb-1">
          Price:{" "}
          <span className="font-normal">
            {displayINRCurrency(product?.price) || "N/A"}
          </span>
        </p>
        <p className="text-gray-800 font-semibold mb-1">
          Selling Price:{" "}
          <span className="font-normal">
            {displayINRCurrency(product?.sellingPrice) || "N/A"}
          </span>
        </p>
        <p className="text-gray-800 font-semibold">
          Quantity:{" "}
          <span className="font-normal">{product?.quantity || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminProductCard;
