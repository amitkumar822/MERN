import React, { useEffect, useState } from "react";
import UploadProduct from "../../components/AdminPannel/UploadProduct";
import { toast } from "react-toastify";
import axios from "axios";
import AdminProductCard from "../../components/AdminPannel/AdminProductCard";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const fetchAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/get-products");
      setProductList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

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
      <div className="flex flex-wrap">
        {productList ? (
          productList.map((product, index) => (
            <AdminProductCard
              key={index}
              product={product}
              fetchAllProduct={fetchAllProduct}
            />
          ))) : <div className="w-full h-[calc(100vh-187px)] skeleton"></div>}
      </div>
    </div>
  );
};

export default AllProducts;