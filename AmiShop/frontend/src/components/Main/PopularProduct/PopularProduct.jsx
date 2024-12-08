import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import displayINRCurrency from "../../../helpers/displayINRCurrency";
import { Box, Chip } from "@mui/material";
import Card from "./Card";

const PopularProduct = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [category, setCategory] = useState("mobiles");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
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
        "VerticalCardError: ",
        error?.response?.data?.message || error
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="font-bold text-2xl">Top Popular Product</h1>
      <div className="container mx-auto">
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

        <div className="w-full h-full flex flex-wrap gap-4 mx-auto">
          {data.map((product, index) => (
            <Link
              to={"product/" + product?._id}
              key={product?.productName + index}
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
