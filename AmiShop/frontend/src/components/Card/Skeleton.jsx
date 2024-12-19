import React from "react";

export const Skeleton = () => {
  return (
    <>
      <div data-aos="zoom-in">
        <div className="productCard lg:w-[18.5rem] w-[10.6rem] md:m-3 mx-1 mt-4 transition-transform transform hover:scale-105 cursor-pointer shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="md:h-[220px] h-[155px] w-full bg-gray-300 skeleton flex items-center justify-center">
            <img
              className="h-full w-full object-contain p-2 bg-white mix-blend-multiply skeleton"
              src="https://via.placeholder.com/100"
            />
          </div>

          {/* Text Section */}
          <div className="textPart bg-white p-4">
            {/* Brand and Name */}
            <div>
              <p className="w-[40%] h-5 rounded-full skeleton"></p>
              <p className="w-full h-5 mt-2 rounded-full skeleton"></p>
            </div>

            {/* Price and Discount */}
            <div className="flex items-center md:mt-2 mt-1 md:space-x-3 space-x-1">
              <p className="w-20 h-5 rounded-full skeleton"></p>
              <p className="w-20 h-5 rounded-full skeleton"></p>
              <p className="w-20 h-5 rounded-full skeleton"></p>
            </div>

            {/* Ram and Storage */}
            <div className="flex items-center md:mt-2 mt-1 md:space-x-3 space-x-1">
              <p className="w-10 h-5 rounded-full skeleton"></p>
              <p className="w-20 h-5 rounded-full skeleton"></p>
            </div>
            <div className="flex items-center md:mt-2 mt-1 md:space-x-3 space-x-1">
              <p className="w-10 h-5 rounded-full skeleton"></p>
              <p className="w-20 h-5 rounded-full skeleton"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
