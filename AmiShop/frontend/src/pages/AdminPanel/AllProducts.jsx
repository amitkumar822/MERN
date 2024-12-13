import React, { useEffect, useState } from "react";
import UploadProduct from "../../components/AdminPannel/UploadProduct";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router";
import ProductCard from "../../components/AdminPannel/ProductCard";

const AllProducts = () => {
  const navigate = useNavigate();

  // pagination set on url
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const handlePageChange = (event, value) => {
    setPage(value); // `value` is the selected page number
    updateUrl(value, limit);
    setLimit(50);
    fetchAllProduct();
  };

  // Function to update the URL
  const updateUrl = (page, limit) => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", limit);
    navigate(`/admin-panel/all-products?${params.toString()}`); // Correct path
  };

  const [productList, setProductList] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-products?page=${page}&limit=${limit}`
      );
      setProductList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(productList);

  // Synchronize page and limit with the URL on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentPage = parseInt(params.get("page")) || 1; // Default to 1
    const currentLimit = parseInt(params.get("limit")) || 50; // Default to 50
    if (currentPage !== page || currentLimit !== limit) {
      setPage(currentPage);
      setLimit(currentLimit);
    }
  }, [location.search]);

  useEffect(() => {
    fetchAllProduct();
  }, [page, limit]);

  return (
    <div className="w-full max-h-[calc(100vh-80px)] overflow-y-auto md:flex flex-col hidden">
      <div className="w-full py-2 px-4 flex justify-between items-center sticky top-0 left-0 bg-white z-10">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="btn border-2 bg-green-600 hover:bg-green-700 duration-200 text-white transition-all py-1 px-3 rounded-full"
          onClick={() =>
            document.getElementById("my_uploadProduct_modal").showModal()
          }
        >
          Upload Product
        </button>
      </div>

      {/* Upload All Product Components */}
      <div>
        <UploadProduct fetchAllProduct={fetchAllProduct} />
      </div>

      {/* Admin Product Cart */}
      <ProductCard products={productList} fetchAllProduct={fetchAllProduct} />

      <div className="w-full flex justify-end mt-4  sticky">
        <Pagination
          value={page}
          onChange={handlePageChange}
          count={50}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default AllProducts;
