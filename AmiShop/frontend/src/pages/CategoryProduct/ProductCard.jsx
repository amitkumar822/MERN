import React, { useContext } from "react";
import { Link } from "react-router-dom";
import scrollTop from "../../helpers/scrollTop";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import UserContext from "../../context/userContext";

const ProductCard = ({ product }) => {
  console.log(product);
  const { fetchCountAddToCart } = useContext(UserContext);

  const onClickToggle = async () => {
    scrollTop();
    // await fetchCountAddToCart();
  };

  const handleAddToCart = async (e, id) => {
    console.log(id);
    console.log(e);
    // await AddToCart(e, id);
    // fetchCountAddToCart();
  };
  return (
    <Link to={`/product/${product?._id}`} onClick={onClickToggle}>
      <div className="productCard bg-white md:w-[13.7rem] lg:w-[16.6rem] xl:w-[18.6rem] w-[11rem] md:m-3 mx-1 mt-4 transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden">
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
            <p className="line-through md:text-sm xl:text-lg text-[8px] text-gray-400">
              ₹{product?.price.toLocaleString()}
            </p>
            <p className="lg:text-sm xl:text-lg text-[8px] text-green-500 font-semibold">
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
            <button className="bg-blue-600 lg:text-lg md:text-sm text-[10.3px] xl:px-4 xl:py-2 px-2 py-1 font-semibold text-nowrap text-white uppercase rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-xl">
              Buy Now
            </button>

            <button className="bg-red-500 lg:text-lg md:text-sm text-[10.3px] xl:px-4 xl:py-2 px-2 py-1 font-semibold text-nowrap text-white uppercase rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-xl">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
