import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import scrollTop from "../../../helpers/scrollTop";
import AddToCart from "../../../helpers/AddToCart";
import UserContext from "../../../context/userContext";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { fetchCountAddToCart } = useContext(UserContext);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchCountAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await AddToCart(e, id);
    navigate("/view-cart");
  };

  return (
    <Link to={`/product/${product?._id}`} onClick={scrollTop()}>
      <div className="productCard bg-white md:w-[13.7rem] lg:w-[16.6rem] xl:w-[18.6rem] w-[11rem] md:m-3 mx-1 mt-4 transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:h-[220px] h-[155px] w-full bg-blue-100  flex items-center justify-center">
          <img
            className="h-full w-full object-contain p-2 mix-blend-darken hover:scale-110 transition-all duration-300 ease-in-out"
            src={product?.productImage[0]?.url}
            alt={product?.productName}
          />
        </div>

        {/* Text Section */}
        <div className="textPart bg-white p-4">
          {/* Brand and Name */}
          <div>
            <p className="lg:text-sm xl:text-lg text-xs font-bold text-gray-600 uppercase">
              {product?.brand}
            </p>
            <p className="lg:text-sm xl:text-lg text-xs font-semibold text-gray-800 truncate">
              {product?.productName}
            </p>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center md:mt-2 mt-1 md:space-x-3 space-x-1">
            <p className="md:text-sm xl:text-lg text-xs font-bold text-green-600">
              ₹{product?.sellingPrice.toLocaleString()}
            </p>
            <p className="line-through md:text-sm xl:text-base text-[8px] text-gray-400">
              ₹{product?.price.toLocaleString()}
            </p>
            <p className="lg:text-sm xl:text-base text-[8px] text-green-500 font-semibold">
              {product?.discountPercentage}% off
            </p>
          </div>

          {/* Additional Info */}
          {/* <div className={`${product?.ssd ? "block" : "hidden"} md:mt-3 mt-1 md:text-sm text-[8px] text-gray-500 flex flex-wrap gap-2`}>
            <p className="bg-gray-200 px-2 py-1 rounded">RAM: {product?.ram}</p>
            <p className="bg-gray-200 px-2 py-1 rounded">
              Storage: {product?.ssd}
            </p>
            <p className="bg-gray-200 px-2 py-1 rounded">
              Display: {product?.displaySize}
            </p>
          </div> */}

          <div className="flex justify-between items-center mt-4 lg:gap-3 gap-1">
            <button
              onClick={(e) => handleBuyProduct(e, product?._id)}
              className="bg-blue-600 lg:text-lg md:text-sm text-[10.3px] xl:px-4 xl:py-2 px-2 py-1 font-semibold text-nowrap text-white uppercase rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-xl"
            >
              Buy Now
            </button>

            <button
              onClick={(e) => handleAddToCart(e, product?._id)}
              className="bg-red-500 lg:text-lg md:text-sm text-[10.3px] xl:px-4 xl:py-2 px-2 py-1 font-semibold text-nowrap text-white uppercase rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="productCard bg-white md:w-[13.7rem] lg:w-[16.6rem] xl:w-[18.6rem] w-[11rem] md:m-3 mx-1 mt-4 transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="md:h-[220px] h-[155px] w-full flex justify-center items-center bg-gray-300 skeleton">
        <img
          className="w-[70%] skeleton animate-spin rounded-full bg-gray-200 mix-blend-multiply"
          src="https://via.placeholder.com/150"
        />
      </div>

      {/* Text Section */}
      <div className="textPart bg-white p-4">
        {/* Brand and Name */}
        <div>
          <p className="bg-gray-200 w-1/2 h-4 rounded-lg skeleton"></p>
          <p className="bg-gray-200 w-full h-4 rounded-lg skeleton mt-2"></p>
        </div>

        {/* Price and Discount */}
        <div className="flex items-center md:mt-2 mt-1 md:space-x-3 space-x-1">
          <p className="bg-gray-200 w-full h-4 rounded-lg skeleton"></p>
          <p className="bg-gray-200 w-full h-4 rounded-lg skeleton"></p>
          <p className="bg-gray-200 w-full h-4 rounded-lg skeleton"></p>
        </div>

        <div className="flex justify-between items-center mt-4 lg:gap-3 gap-1">
          <button className="bg-gray-200 w-full h-4 rounded-lg skeleton"></button>
          <button className="bg-gray-200 w-full h-4 rounded-lg skeleton"></button>
        </div>
      </div>
    </div>
  );
};
