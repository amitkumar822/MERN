import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Chip } from "@mui/material";
import Card from "./Card";
import scrollTop from "../../../helpers/scrollTop";
import { Skeleton } from "../../Card/Skeleton";
import API from "../../../api/axiosInstance";

const PopularProduct = () => {
  const [category, setCategory] = useState("mobiles");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await API.post(
        "/product/get-category-namewise-product",
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
    <div className=" mx-auto my-8 md:p-3 ">
      <h1 className="font-bold md:text-2xl">Top Popular Product</h1>
      <div className="mx-auto">
        <div>
          {/* Category Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: 2,
              mb: 2,
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

        <div className="w-full md:max-h-[62rem] overflow-y-auto flex flex-wrap justify-center items-center gap-2 py-4 mx-auto">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : data?.slice(0, 10)?.map((product, index) => (
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


