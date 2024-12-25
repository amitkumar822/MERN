import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(16).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/product/get-category-product");

    setLoading(false);
    setCategoryProduct(data?.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll no-scrollbar">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div className="flex flex-col items-center justify-center" key={index}>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 skeleton bg-gray-200"></div>
                  <p className="h-4 w-14 bg-gray-200 mt-2 skeleton rounded-full"></p>
                </div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/category-filter?category=" + product?.category}
                  className="cursor-pointer"
                  key={product?.category + index}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden md:p-4 p-2 flex items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100">
                      <img
                        src={product?.productImage[0]?.url}
                        alt={product?.category}
                        className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                      />
                    </div>
                    <p className="text-center text-[10px] md:text-base capitalize">
                      {product?.category}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
