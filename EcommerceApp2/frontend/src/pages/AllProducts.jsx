import React from "react";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-y-auto md:flex hidden pt-1">
      <div className="w-full py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="btn border-2 bg-green-600 hover:bg-green-700 duration-200 text-white transition-all py-1 px-3 rounded-full"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Upload Product
        </button>
      </div>
      <UploadProduct />
    </div>
  );
};

export default AllProducts;
