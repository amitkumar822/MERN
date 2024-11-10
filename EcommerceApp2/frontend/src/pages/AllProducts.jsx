import React from "react";

const AllProducts = () => {
  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-y-auto md:flex hidden pt-1">
      <div className="w-full py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ">
          Upload Product
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
