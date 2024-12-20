import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import scrollTop from "../../../helpers/scrollTop";
import { IoMdArrowDown, IoMdTrendingDown } from "react-icons/io";
import AddToCart from "../../../helpers/AddToCart";
import UserContext from "../../../context/userContext";
import BeatLoader from "react-spinners/BeatLoader";

const CardBestSellingProduct = ({ item, idx }) => {
  const { fetchCountAddToCart } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState("");

  const handleAddToCart = async (event, id) => {
    setLoading(true);
    setIndex(id);
    await AddToCart(event, id);
    fetchCountAddToCart();
    setIndex("");
    setLoading(false);
  };


  return (
    <>
      <Link
        to={`/product/${item?._id}`}
        onClick={scrollTop()}
        className="xl:w-[22rem] md:w-[18rem] sm:w-[11.3rem] w-[10.7rem] md:h-[20.5rem] overflow-hidden md:px-4 px-2 pt-4 pb-2 border rounded-lg shadow hover:shadow-lg bg-white transition-transform transform md:hover:-translate-y-2 group"
      >
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={item.productImage[0].url}
            alt={item.category}
            className={`md:h-36 h-32 mb-2 transition-all ease-in-out duration-300 transform hover:scale-125 ${
              idx % 2 === 0 ? "hover:rotate-12" : "hover:-rotate-12"
            }`}
          />
        </div>

        {/* Text Section */}
        <div className="bg-white text-container transition-transform transform md:group-hover:-translate-y-4">
          <h3 className="md:text-sm text-xs font-semibold text-gray-500 uppercase">
            {item.brand}
          </h3>
          <h3 className="lg:text-[16px] md:text-sm text-xs font-semibold line-clamp-2">
            {item.productName}
          </h3>
          <div className="max-w-[19rem] overflow-hidden flex items-center mt-2 md:space-x-2 space-x-1">
            <p className="lg:text-lg md:text-sm text-[12px] font-bold text-blue-600">
              ₹{item?.sellingPrice.toLocaleString()}
            </p>
            <p className="lg:text-sm md:text-xs text-[9px] line-through text-gray-400">
              ₹{item?.price.toLocaleString()}
            </p>
            <p className="lg:text-sm md:text-xs text-[9px] text-green-500 font-semibold text-nowrap flex items-center gap-1">
              {item?.discountPercentage}%{" "}
              <IoMdArrowDown className="md:text-xl text-sm" />
            </p>
          </div>

          {/* Button Section */}
          <button
            className={`bg-blue-500 text-white md:px-4 px-3 md:py-2 py-1 rounded-md mt-2 w-full`}
            disabled={loading}
            onClick={(event) => handleAddToCart(event, item?._id)}
          >
            {loading && item?._id === index ? (
              <BeatLoader color="white" size={15} />
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </Link>
    </>
  );
};

export default CardBestSellingProduct;