import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import axios from "axios";
import OfflineShareIcon from "@mui/icons-material/OfflineShare";
import { styled } from '@mui/system';

const LeftRightBanner = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const category = "mobiles";
    try {
      const { data } = await axios.post(
        "/api/product/get-category-namewise-product",
        { category },
        { "content-type": "application/json" }
      );

      setData(data?.data);
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
    <div className="xl:container w-full max-h-[870px] mx-auto overflow-hidden flex gap-4 p-4 bg-gradient-to-r from-violet-200 to-pink-200">
      {/* Left Side: Cards Section */}
      <div className="relative lg:w-1/3 w-full overflow-hidden">
        {/* Single Button for all cards */}
        <div className="w-full flex justify-between">
          <h1 className="md:text-2xl font-bold">Best Selling Products</h1>
          <Button
            variant="contained"
            color="primary"
            startIcon={<KeyboardDoubleArrowRightIcon />}
            className="absolute top-2 right-2 z-10"
            onClick={handleLeftButtonClick}
          ></Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:gap-4 gap-2 mt-4">
          {data?.slice(4, 8).map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg bg-white transition-transform transform hover:-translate-y-2 group"
            >
              <div className="flex justify-center items-center">
                <img
                  src={item.productImage[0].url}
                  alt={item.productName}
                  className="md:w-56 md:h-56 w-48 h-48 mb-2"
                />
              </div>
              <div className="bg-white text-container transition-transform transform group-hover:-translate-y-4">
                <h3 className="md:text-lg text-sm font-semibold text-gray-500">
                  {item.brand}
                </h3>
                <h3 className="lg:text-lg md:text-sm text-xs font-semibold line-clamp-2">
                  {item.productName}
                </h3>
                <div className="flex items-center mt-2 md:space-x-2 space-x-1">
                  <p className="lg:text-lg md:text-sm text-[12px] font-bold text-green-600">
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
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Banner Section */}
      <div className="relative bg-gradient-to-r from-rose-100 to-teal-100 w-2/3 max-h-full overflow-hidden rounded-lg shadow hover:shadow-lg md:flex hidden flex-col">
        {/* Text Content */}
        <div className="text-center mt-10">
          <h2 className="md:text-4xl lg:text-3xl text-2xl font-bold drop-shadow-md">
            Top Selling Smartphones
          </h2>
          <p className="md:text-lg text-sm">Latest Technology, Best Brands</p>
        </div>

        <div className="w-full h-full flex justify-center items-end gap-8">
          <img
            src={data[0]?.productImage[2]?.url}
            alt={data[0]?.productName}
            className="md:h-[90%] h-[60%] mix-blend-darken rotate-12"
          />
          <img
            src={data[1]?.productImage[2]?.url}
            alt={data[1]?.productName}
            className="md:h-[90%] lg:block hidden mix-blend-darken rotate-12"
          />
        </div>

        {/* Button */}
        <div className="absolute bottom-0 left-[50%] -translate-x-[50%] m-12">
      <GradientButton>
        Explore Now
        <OfflineShareIcon />
      </GradientButton>
    </div>
      </div>
    </div>
  );
};

export default LeftRightBanner;

const GradientButton = styled(Button)(({ theme }) => ({
  width: '250px',
  height: '70px',
  borderRadius: '10px',
  fontSize: '1.25rem',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(to right, #38bdf8, #34d399, #3b82f6)',
  backgroundSize: '200% 100%',
  backgroundPosition: 'right bottom',
  color: 'white',
  transition: 'all 0.5s ease-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundPosition: 'left bottom',
    color: 'black',
  },
  '& .MuiSvgIcon-root': {
    marginLeft: theme.spacing(1),
    fontSize: '1.75rem',
  },
  // Responsive styles
  [theme.breakpoints.down('lg')]: {
    width: '200px',
    height: '60px',
    fontSize: '1rem',
    '& .MuiSvgIcon-root': {
      fontSize: '1.5rem',
    },
  },
  [theme.breakpoints.down('xs')]: {
    width: '180px',
    height: '50px',
    fontSize: '0.875rem',
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
    },
  },
}));