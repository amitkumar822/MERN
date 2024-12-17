import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import scrollTop from "../../../helpers/scrollTop";

const BestSellingProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const category = "mobiles";
    try {
      const { data } = await axios.get(
        "/api/product/best-selling-product",
        { category },
        { "content-type": "application/json" }
      );

      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Action for the single button
  const handleLeftButtonClick = () => {
    // alert('Display all related items!');
  };

  return (
    <div className="w-full xl:max-h-[670px] mx-auto overflow-hidden flex gap-4 p-2 bg-gradient-to-r from-violet-200 to-pink-200">
      {/* Left Side: Cards Section */}
      <div className="relative w-full overflow-hidden ">
        {/* Single Button for all cards */}
        <div className="w-full flex justify-between">
          <h1 className="md:text-2xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">Best Selling Products</h1>
          <Link to={"/category-filter?category=" + "mobiles"}>
            <Button
              variant="contained"
              color="primary"
              className="absolute top-2 right-2 z-10"
              onClick={handleLeftButtonClick}
            >
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </Link>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid xl:grid-cols-3 grid-cols-2  lg:gap-4 gap-2 mt-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 grid-cols-2  lg:gap-4 gap-2 mt-4">
            {data?.map((item, index) => (
              <Link
                to={"product/" + item?._id}
                onClick={scrollTop}
                key={item._id + index}
                className="p-4 border rounded-lg shadow hover:shadow-lg bg-white transition-transform transform hover:-translate-y-2 group"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={item.productImage[0].url}
                    alt={item.productName}
                    className=" h-36 mb-2"
                  />
                </div>
                <div className="bg-white text-container transition-transform transform group-hover:-translate-y-4">
                  <h3 className="md:text-lg text-sm font-semibold text-gray-500 uppercase">
                    {item.brand}
                  </h3>
                  <h3 className="lg:text-[16px] md:text-sm text-xs font-semibold line-clamp-2">
                    {item.productName}
                  </h3>
                  <div className="flex items-center mt-2 md:space-x-2 space-x-1">
                    <p className="lg:text-lg md:text-sm text-[12px] font-bold text-blue-600">
                      ₹{item?.sellingPrice.toLocaleString()}
                    </p>
                    <p className="lg:text-sm md:text-xs text-[9px] line-through text-gray-400">
                      ₹{item?.price.toLocaleString()}
                    </p>
                    <p className="lg:text-sm md:text-xs text-[9px] text-green-500 font-semibold text-nowrap">
                      {item?.discountPercentage}% off
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Banner Section */}
      <div className="relative bg-gradient-to-r from-rose-100 to-teal-100 lg:w-2/3 max-h-full overflow-hidden rounded-lg shadow hover:shadow-lg md:flex hidden flex-col">
        {/* Text Content */}
        <div className="text-center mt-10">
          <h2 className="lg:text-3xl md:text-xl text-sm flex gap-2 justify-center font-bold drop-shadow-md">
            {/* Top Brand <h1 className="text-blue-500">{data[2]?.brand}</h1> And <h1 className="text-blue-500">{data[0]?.brand}</h1> */}
            Top Brand <h1 className="text-blue-500">Samsung</h1> And{" "}
            <h1 className="text-blue-500">Apple</h1>
            {/* Top Selling Smartphones */}
          </h2>
          <p className="lg:text-lg text-sm">Latest Technology, Best Brands</p>
        </div>

        <div className="w-full h-full flex justify-center items-end gap-8">
          <img
            // src={data[0]?.productImage[2]?.url}
            src="	https://res.cloudinary.com/dud6rs8er/image/upload/v1733588937/tlcs98wk5demml4igqs6.webp"
            // alt={data[0]?.productName}
            className="xl:h-[90%] md:h-[70%] h-[60%] mix-blend-darken rotate-12"
          />
          <img
            src="https://res.cloudinary.com/dud6rs8er/image/upload/v1733551466/n0jo9df8ejmctouwerhg.jpg"
            // src={data[1]?.productImage[2]?.url}
            // alt={data[1]?.productName}
            className="md:h-[90%] xl:block hidden mix-blend-darken rotate-12"
          />
        </div>

        {/* Button */}
        <div className="absolute w-full bottom-10 flex justify-center items-center">
          <GradientButton>
            Explore Now
            <OfflineShareIcon />
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProduct;

const GradientButton = styled(Button)(({ theme }) => ({
  width: "200px",
  height: "60px",
  borderRadius: "10px",
  fontSize: "1.20rem",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #38bdf8, #34d399, #3b82f6)",
  backgroundSize: "200% 100%",
  backgroundPosition: "right bottom",
  color: "white",
  transition: "all 0.5s ease-out",
  cursor: "pointer",
  "&:hover": {
    backgroundPosition: "left bottom",
    color: "black",
  },
  "& .MuiSvgIcon-root": {
    marginLeft: theme.spacing(1),
    fontSize: "1.75rem",
  },
  // Responsive styles
  [theme.breakpoints.down("lg")]: {
    width: "180px",
    height: "60px",
    fontSize: "1rem",
    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },
  },
}));

const Skeleton = () => {
  return (
    <div>
      <div className="p-4 border rounded-lg shadow hover:shadow-lg bg-white transition-transform transform hover:-translate-y-2 group">
        <div className="flex justify-center items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Skleton"
            className="w-36 h-36 mb-2 animate-pulse"
          />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <h3 className=" text-gray-500 w-[50%] h-5 bg-gray-400 animate-pulse rounded-full"></h3>
          <h3 className="w-full h-5 mt-2 bg-gray-400 animate-pulse rounded-full"></h3>
          <div className="flex items-center mt-2 md:space-x-2 space-x-1">
            <div className="w-20 h-5 bg-gray-400 animate-pulse rounded-full"></div>
            <div className="w-20 h-5 bg-gray-400 animate-pulse rounded-full"></div>
            <div className="w-20 h-5 bg-gray-400 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
