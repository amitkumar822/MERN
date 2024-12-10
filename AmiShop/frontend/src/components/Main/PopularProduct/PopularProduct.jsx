import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../../../helpers/displayINRCurrency";
import { Box, Chip } from "@mui/material";
import Card from "./Card";
import scrollTop from "../../../helpers/scrollTop";

const PopularProduct = () => {
  const [category, setCategory] = useState("mobiles");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.post(
        "/api/product/get-category-namewise-product",
        { category },
        { "content-type": "application/json" }
      );

      setData(data?.data);
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
    <div className="xl:container mx-auto my-8">
      <h1 className="font-bold md:text-2xl mb-2">Top Popular Product</h1>
      <div className="xl:container mx-auto">
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

        <div className="w-full md:max-h-[62rem] hover:pb-14 overflow-y-auto flex flex-wrap justify-center items-center gap-4 mx-auto">
          {data.map((product, index) => (
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
