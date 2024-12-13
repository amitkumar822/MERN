import React, { useRef, useState } from "react";
import { brandLogo } from "../../../data/BrandLogo/BrandLogoExport";
import axios from "axios";

const TopBrand = () => {
  const marqueeRef = useRef(null);

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop(); // Stops marquee scrolling
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start(); // Resumes marquee scrolling
    }
  };

  const [brandWiseProduct, setBrandWiseProduct] = useState([]);

  const handleBrandClick = async (brand) => {
    alert("brand: " + brand);
    console.log(brand);
    const { data } = await axios.post(
      `/api/product/get-brand-wise-product/${brand}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setBrandWiseProduct(data?.data);
  };

  console.log(brandWiseProduct);

  return (
    <div className="w-full mx-auto">
      <marquee
        ref={marqueeRef}
        behavior="alternate"
        direction="left"
        scrollamount="10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full flex items-center gap-6 py-4">
          {brandLogo.map((img, index) => (
            <img
              key={index + img.id}
              src={img.image}
              alt={img.name}
              onClick={() => handleBrandClick(img.name?.toLowerCase())}
              className="max-w-60 min-w-60 max-h-32 min-h-32 overflow-hidden cursor-pointer p-2 mix-blend-darken bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            />
          ))}
        </div>
      </marquee>
    </div>
  );
};

export default TopBrand;
