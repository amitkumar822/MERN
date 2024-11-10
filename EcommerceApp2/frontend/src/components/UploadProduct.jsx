import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductCategory from "../helpers/ProductCategory";

const UploadProduct = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [], // URLs for display
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [imageFiles, setImageFiles] = useState([]); // Actual files for upload
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectCategory = (value) => {
    setData((prevData) => ({
      ...prevData,
      category: value,
    }));
    setDropdownOpen(false);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Create URLs for display and add files to imageFiles state for upload
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, ...imagesArray],
    }));
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      productImage: prevData.productImage.filter((_, i) => i !== index),
    }));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, including API call with imageFiles
    console.log("Data: ", data);
    console.log("Image Files: ", imageFiles);
  };

  //   console.log("ImgFIles: ", JSON.stringify(imageFiles, null, 2));
  //   console.log("ImageURL: ", JSON.stringify(data.productImage, null, 2));

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-h-[calc(100vh-120px)] overflow-hidden bg-white shadow-lg rounded-lg">
          {/* Header section */}
          <div className="relative pb-3 border-b">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 hover:bg-gray-200"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-blue-600">Upload Product</h3>
          </div>

          {/* Scrollable form section */}
          <div className="overflow-y-auto max-h-[calc(100vh-180px)] mt-4">
            <form
              onSubmit={handleSubmit}
              className="grid p-4 gap-4 bg-gray-50 rounded-lg shadow-inner"
            >
              {/* Category Dropdown */}
              <label
                htmlFor="category"
                className="text-gray-700 font-semibold mt-4 block"
              >
                Category
              </label>
              <div
                className="relative"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <div className="p-3 border border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-300">
                  {data.category || "Select Category"}
                  <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                    ▼
                  </span>
                </div>
                {isDropdownOpen && (
                  <div
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                    className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                  >
                    {ProductCategory.map((el, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectCategory(el.value)}
                      >
                        {el.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Name */}
              <label
                htmlFor="productName"
                className="text-gray-700 font-semibold"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                name="productName"
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                value={data.productName}
                onChange={handleInputChange}
                required
              />

              {/* Brand Name */}
              <label
                htmlFor="brandName"
                className="text-gray-700 font-semibold"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                placeholder="Enter brand name"
                name="brandName"
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                value={data.brandName}
                onChange={handleInputChange}
                required
              />

              {/* Product Image Upload */}
              <label
                htmlFor="productImage"
                className="text-gray-700 font-semibold"
              >
                Product Image
              </label>
              <label htmlFor="uploadImageInput" className="relative">
                <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                  <FaCloudUploadAlt className="text-4xl text-gray-500" />
                  <p className="text-sm text-gray-500">Upload Product Images</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </label>

              {/* Display Thumbnails of Uploaded Images */}
              <div className="flex flex-wrap gap-2 mt-2">
                {data.productImage.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute bottom-1 right-4 text-red-500 bg-white rounded-full hover:bg-gray-100"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Fields */}
              <label htmlFor="price" className="text-gray-700 font-semibold">
                Price
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                name="price"
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                value={data.price}
                onChange={handleInputChange}
                required
              />

              <label
                htmlFor="sellingPrice"
                className="text-gray-700 font-semibold"
              >
                Selling Price
              </label>
              <input
                type="number"
                id="sellingPrice"
                placeholder="Enter selling price"
                name="sellingPrice"
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                value={data.sellingPrice}
                onChange={handleInputChange}
                required
              />

              {/* Description */}
              <label
                htmlFor="description"
                className="text-gray-700 font-semibold"
              >
                Description
              </label>
              <textarea
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 resize-none"
                placeholder="Enter product description"
                rows={3}
                name="description"
                value={data.description}
                onChange={handleInputChange}
              ></textarea>

              {/* Submit Button */}
              <button className="mt-4 px-5 py-3 mb-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                Upload Product
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UploadProduct;
