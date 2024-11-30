import React, { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import AdminEditProduct from "../AdminPannel/AdminEditProduct";
import DeleteAdminProduct from "../../../../../DeleteAdminProduct";

const AdminProductCard = ({ product, fetchAllProduct }) => {
  const [eachProduct, setEachProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [delayedHover, setDelayedHover] = useState(false);

  const onEdit = (eachProductNew) => {
    setEachProduct(eachProductNew);
  };

  const onDelete = async (productId) => {
    setProductId(productId);
  };

  const primaryImage = product?.productImage[0]?.url;
  const secondaryImage = product?.productImage[1]?.url;

  const handleMouseEnter = () => {
    setIsImageHovered(true);
    // Introduce a 20ms delay before setting delayedHover to true
    setTimeout(() => {
      setDelayedHover(true);
    }, 20);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(false);
    setDelayedHover(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-64 m-4 relative">
      {/* New Badge */}
      <div className="absolute top-2 left-2 bg-blue-200 text-blue-700 px-2 py-1 text-xs font-semibold rounded-full">
        New
      </div>

      {/* Discount Badge */}
      <div className="absolute top-2 right-2 bg-red-200 text-red-700 px-2 py-1 text-xs font-semibold rounded-full">
        -20%
      </div>

      <div className="relative">
        <figure
          className="flex bg-white justify-center items-center w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-full h-40">
            {/* Image with Smooth, Delayed Transition and Overlay Effect */}
            <img
              src={delayedHover && secondaryImage ? secondaryImage : primaryImage}
              alt={product?.productName || "Product"}
              className={`w-full h-full object-cover cursor-pointer rounded-t-md transition-transform duration-500 ease-in-out ${
                isImageHovered ? "scale-105" : ""
              }`}
              style={{
                transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                opacity: delayedHover && secondaryImage ? 1 : 0.9,
              }}
            />
            {/* Overlay Effect on Primary Image */}
            {!delayedHover && (
              <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 rounded-t-md"></div>
            )}
          </div>
        </figure>
        
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          {/* Edit Button */}
          <button
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
            onClick={() => onEdit(product)}
            title="Edit Product"
          >
            <MdModeEditOutline />
          </button>
          
          {/* Delete Button */}
          <button
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
            onClick={() => onDelete(product._id)}
            title="Delete Product"
          >
            <MdDelete />
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 capitalize">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product?.productName || "No Product Name"}
        </h2>
        <p className="text-gray-600 text-sm mb-2">
          {product?.category || "Category"}
        </p>
        
        <p className="text-gray-800 font-semibold mb-1">
          Price: <span className="text-red-600 line-through mr-1">{displayINRCurrency(product?.price)}</span>
          <span className="text-green-600 font-bold">{displayINRCurrency(product?.sellingPrice)}</span>
        </p>

        {/* Ratings Placeholder */}
        <p className="text-yellow-500 text-sm mb-2">
          ★★★★☆ (150 Reviews)
        </p>

        {/* View Button Only */}
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded">
            View
          </button>
        </div>
      </div>

      {/* Edit Product Modal */}
      {eachProduct?.productName && (
        <AdminEditProduct
          product={eachProduct}
          setEachProduct={setEachProduct}
          fetchAllProduct={fetchAllProduct}
        />
      )}

      {/* Delete Product Modal */}
      {productId && (
        <DeleteAdminProduct
          productId={productId}
          setProductId={setProductId}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
