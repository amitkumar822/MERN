import axios from "axios";
import React, { useEffect, useState } from "react";
import CardBestSellingProduct from "./CardBestSellingProduct";
import { Skeleton } from "../../Card/Skeleton";

const AllBestSellingProduct = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get(
        "/api/product/get-best-selling-all-product",
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setProductData(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="w-full h-screen mx-auto overflow-y-auto p-4 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      {loading ? (
        <div className="flex flex-wrap justify-center items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-4">
          {productData.map((item, index) => (
            <CardBestSellingProduct
              item={item}
              key={index}
              buttonHidden={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBestSellingProduct;
