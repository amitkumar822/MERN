import React, { useRef, useState } from "react";
import { brandLogo } from "../../../data/BrandLogo/BrandLogoExport";
import axios from "axios";
import SearchVerticalCart from "../../Card/SearchVerticalCart/SearchVerticalCart";
import { Button, Dialog } from "@mui/material";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);

  const handleBrandClick = async (brand) => {
    try {
      const { data } = await axios.post(
        `/api/product/get-brand-wise-product/${brand}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setBrandWiseProduct(data?.data);
      setLoading(false);
      console.log(data?.data);
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "No Any Product!");
    }
  };

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
              onClick={() => handleBrandClick(img.name)}
              className="max-w-60 min-w-60 max-h-32 min-h-32 overflow-hidden cursor-pointer p-2 mix-blend-darken bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            />
          ))}
        </div>
      </marquee>

      <Dialog
        open={brandWiseProduct.length !== 0 && !loading}
        onClose={() => setBrandWiseProduct([])}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            width: "98%",
            margin: 0,
          },
        }}
      >
        {/* Close Button */}
        <Button
          onClick={() => setBrandWiseProduct([])}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
            backgroundColor: "#f0f0f0", // Circular background color
            borderRadius: "50%",
            padding: "8px 12px",
            minWidth: "unset", // Prevents default button width
          }}
        >
          X
        </Button>

        {/* Content */}
        <SearchVerticalCart loading={loading} data={brandWiseProduct} />
      </Dialog>
    </div>
  );
};

export default TopBrand;
