import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Chip } from "@mui/material";
import Card from "./Card";
import scrollTop from "../../../helpers/scrollTop";

const PopularProduct = () => {
  const [category, setCategory] = useState("mobiles");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.post(
        "/api/product/get-category-namewise-product",
        { category },
        { "content-type": "application/json" }
      );

      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error(
        "PopularProductError: ",
        error?.response?.data?.message || error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [category || ""]);

  return (
    <div className=" mx-auto my-8 md:px-3">
      <h1 className="font-bold md:text-2xl mb-2">Top Popular Product</h1>
      <div className="mx-auto">
        <div>
          {/* Category Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: 2,
              mb: 4,
            }}
          >
            {["mobiles", "laptops", "televisions"].map((cat) => (
              <Chip
                key={cat}
                label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                onClick={() => setCategory(cat)}
                color={category === cat ? "primary" : "default"}
                clickable
              />
            ))}
          </Box>
        </div>

        <div className="w-full md:max-h-[62rem] overflow-y-auto flex flex-wrap justify-center items-center gap-1 py-4 mx-auto">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : data?.slice(0, 10).map((product, index) => (
                <Link
                  to={"product/" + product?._id}
                  key={product?.productName + index}
                  onClick={scrollTop}
                >
                  <Card product={product} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;

const Skeleton = () => {
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
