import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../../Card/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router";
import CardBestSellingProduct from "./CardBestSellingProduct";

const AllBestSellingProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pages = searchParams.get("page");
  const limits = searchParams.get("limit");

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(pages || 1);
  const [limit, setLimit] = useState(limits || 20);

  const handlePageChange = (event, value) => {
    setPage(value);
    setLimit(20);
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
    <div className="w-full h-[92vh] mx-auto overflow-y-auto bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      {loading ? (
        <div className="flex flex-wrap justify-center items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="md:px-3 px-1 sm:pt-3 pt-1 flex flex-wrap justify-center items-center md:gap-3 gap-1 md:pb-16">
          {productData.map((item, index) => (
            <CardBestSellingProduct item={item} key={index} idx={index} />
          ))}
        </div>
      )}

      {/* Pagination Section at the bottom */}
      <Stack
        spacing={2}
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          backgroundColor: "white",
          paddingY: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 2,
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
  );
};

export default AllBestSellingProduct;
