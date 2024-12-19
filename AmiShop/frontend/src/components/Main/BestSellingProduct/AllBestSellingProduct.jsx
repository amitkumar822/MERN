import axios from "axios";
import React, { useEffect, useState } from "react";
import CardBestSellingProduct from "./CardBestSellingProduct";
import { Skeleton } from "../../Card/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router";

const AllBestSellingProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pages = searchParams.get("page");
  const limits = searchParams.get("limit");

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(pages || 1);
  const [limit, setLimit] = useState(limits || 10);

  const handlePageChange = (event, value) => {
    setPage(value);
    setLimit(10);
  };

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-best-selling-all-product?page=${page}&limit=${limit}`,
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
  }, [page]);

  // update url
  useEffect(() => {
    const newUrl = `/best-selling-product?page=${page}&limit=${limit}`;
    navigate(newUrl);
  }, [page, limit]);

  return (
    <div className="w-full h-[92vh] mx-auto overflow-y-auto p-4 bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
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
      {/* Pagination Section at the bottom */}
      <div className="w-full flex justify-center mt-4">
        <Stack
          spacing={2}
          sx={{
            position: "absolute",
            bottom: 0,
            //   backgroundColor: "rgba(0, 0, 0, 0.1)",
            paddingY: "0.5rem",
          }}
        >
          <Pagination
            value={page}
            onChange={handlePageChange}
            count={50}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default AllBestSellingProduct;
