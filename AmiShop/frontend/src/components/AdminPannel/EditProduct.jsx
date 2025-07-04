import React, { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductCategory from "../../helpers/ProductCategory";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import DisplayImage from "../DisplayImage";
import API from "../../api/axiosInstance";

const EditProduct = ({ product, setEachProduct, fetchAllProduct }) => {
  const fileInputRef = useRef(null);
  useEffect(() => {
    document.getElementById("edit_product_modal").showModal();
  }, [product?.productName]);

  let [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    productName: product?.productName || "",
    description: product?.description || "",
    price: product?.price || "",
    sellingPrice: product?.sellingPrice || "",
    brand: product?.brand || "",
    category: product?.category || "",
    quantity: product?.quantity || "",
    inTheBox: product?.inTheBox || "",
    ram: product?.ram || "",
    ssd: product?.ssd || "",
    processorType: product?.processorType || "",
    processorSpeed: product?.processorSpeed || "",
    displaySize: product?.displaySize || "",
    displayType: product?.displayType || "",
    displayResolution: product?.displayResolution || "",
    operatingSystem: product?.operatingSystem || "",
    primaryCamera: product?.primaryCamera || "",
    secondaryCamera: product?.secondaryCamera || "",
    batteryCapacity: product?.batteryCapacity || "",
  });

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

  const [newProductImage, setProductImage] = useState({
    newImgPreview: [],
    newImg: [],
  });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.warning("You can only upload a maximum of 5 images.");
      return;
    }

    const imagesArray2 = files?.map((file) => file);

    // Create URLs for display and add files to imageFiles state for uploa
    const imageObjects = files?.map((file) => {
      return {
        public_id: "", // public_id is empty for newly uploaded files
        url: URL.createObjectURL(file), // Use the blob URL for preview
      };
    });

    setProductImage((prevData) => ({
      ...prevData,
      newImgPreview: [...prevData.newImgPreview, ...imageObjects],
      newImg: [...prevData.newImg, ...imagesArray2],
    }));
  };

  // Set imageUrlList and newProductImage when productImage is loaded
  useEffect(() => {
    if (product?.productImage) {
      const arrayOfProductImages = product.productImage?.map((imageDetails) => ({
        public_id: imageDetails.public_id,
        url: imageDetails.url,
      }));

      // Set newProductImage with backend image URLs for preview
      setProductImage((prevData) => ({
        ...prevData,
        newImgPreview: arrayOfProductImages, // Set only the preview list here
      }));
    }
  }, [product?.productImage]);

  const handleRemoveImage = async ({ index, public_id, productId }) => {
    if (public_id && productId) {
      try {
        await API.delete(
          `/product/delete-product-img/${productId}/image/${public_id}`
        );
        fetchAllProduct();
        toast.success("Successfully deleted product Image");
      } catch (error) {
        console.error(
          `Failed to delete image with public_id ${public_id}: \n`,
          error?.response?.data?.message
        );
        toast.error("Failed to delete image from Cloudinary.");
        return;
      }
    }

    setProductImage((prevData) => ({
      ...prevData,
      // Remove the image from newImgPreview based on the index
      newImgPreview: prevData.newImgPreview.filter((_, i) => i !== index),
      // Remove the file from newImg based on the index
      newImg: prevData.newImg.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a new FormData object
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description.trim());
    formData.append("price", parseFloat(data.price));
    formData.append("sellingPrice", parseFloat(data.sellingPrice));
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("quantity", parseInt(data.quantity));
    formData.append("inTheBox", data?.inTheBox.trim());
    formData.append("ram", data?.ram);
    formData.append("ssd", data?.ssd);
    formData.append("processorType", data?.processorType);
    formData.append("processorSpeed", data?.processorSpeed);
    formData.append("displaySize", data?.displaySize);
    formData.append("displayType", data?.displayType);
    formData.append("displayResolution", data?.displayResolution);
    formData.append("operatingSystem", data?.operatingSystem);
    formData.append("primaryCamera", data?.primaryCamera);
    formData.append("secondaryCamera", data?.secondaryCamera);
    formData.append("batteryCapacity", data?.batteryCapacity);

    // Append each image file to the FormData
    newProductImage.newImg.forEach((file) => {
      formData.append("productImage", file);
    });

    try {
      await API.post(`/product/update/${product?._id}`, formData);
      fetchAllProduct();
      setLoading(false);
      document.getElementById("edit_product_modal").close();
      toast.success("Product Uploaded Successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Faild To Upload Product, Try Again!"
      );
    }
  };

  // Big Screen Display Single Image
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  return (
    <div>
      <div>
        <dialog id="edit_product_modal" className="modal">
          <div className="modal-box max-h-[calc(100vh-120px)] overflow-hidden bg-white shadow-lg rounded-lg">
            {/* Header section */}
            <div className="relative pb-3 border-b">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 hover:bg-gray-200"
                onClick={() => (
                  document.getElementById("edit_product_modal").close(),
                  setEachProduct({})
                )}
              >
                ✕
              </button>
              <h3 className="font-bold text-lg text-blue-600 text-center">
                Edit Product And Update
              </h3>
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
                      {ProductCategory?.map((el, index) => (
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
                  htmlFor="product"
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
                <label htmlFor="brand" className="text-gray-700 font-semibold">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="brand"
                  placeholder="Enter brand name"
                  name="brand"
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                  value={data.brand}
                  onChange={handleInputChange}
                  required
                />

                {/* Product Image Upload */}
                <div>
                  <label
                    htmlFor="uploadImageInput"
                    className="text-gray-700 font-semibold"
                  >
                    Product Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                  >
                    <FaCloudUploadAlt className="text-4xl text-gray-500" />
                    <p className="text-sm text-gray-500">
                      Upload Product Images
                    </p>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="uploadImageInput"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Display Thumbnails of Uploaded Images */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {newProductImage.newImgPreview?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(image);
                          document.getElementById("my_modal_4").showModal();
                        }}
                        src={image?.url}
                        alt={`Uploaded ${index}`}
                        className="w-20 h-20 object-cover rounded-full border border-black cursor-pointer"
                      />
                      <span
                        onClick={() =>
                          handleRemoveImage({
                            index,
                            public_id: image?.public_id,
                            productId: product?._id,
                          })
                        }
                        className="absolute bottom-1 right-4 cursor-pointer text-red-500 bg-white rounded-full hover:bg-red-600 hover:text-white duration-200"
                      >
                        <MdDelete />
                      </span>
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
                  // min={1}
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                  value={data.sellingPrice}
                  onChange={handleInputChange}
                  required
                />

                <label
                  htmlFor="quantity"
                  className="text-gray-700 font-semibold"
                >
                  Rotal No Of Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="Enter total quantity"
                  name="quantity"
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                  value={data.quantity}
                  onChange={handleInputChange}
                  required
                />

                {/* specification section mobile, laptop, and smart tv */}
                <div
                  className={`grid gap-4 ${
                    data.category === "mobiles" ||
                    data.category === "laptops" ||
                    data.category === "televisions"
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <label htmlFor="ram" className="text-gray-700 font-semibold">
                    RAM
                  </label>
                  <input
                    type="text"
                    id="ram"
                    placeholder="Enter RAM size"
                    name="ram"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.ram}
                    onChange={handleInputChange}
                  />

                  <label htmlFor="ssd" className="text-gray-700 font-semibold">
                    SSD
                  </label>
                  <input
                    type="text"
                    id="ssd"
                    placeholder="Enter SSD storage size"
                    name="ssd"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.ssd}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="processorType"
                    className="text-gray-700 font-semibold"
                  >
                    Processor Type
                  </label>
                  <input
                    type="text"
                    id="processorType"
                    placeholder="Enter PROCESSOR TYPE"
                    name="processorType"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.processorType}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="processorSpeed"
                    className="text-gray-700 font-semibold"
                  >
                    Processor Speed
                  </label>
                  <input
                    type="text"
                    id="processorSpeed"
                    placeholder="Enter PROCESSOR SPEED"
                    name="processorSpeed"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.processorSpeed}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="displaySize"
                    className="text-gray-700 font-semibold"
                  >
                    Display Size
                  </label>
                  <input
                    type="text"
                    id="displaySize"
                    placeholder="Enter DISPLAY SIZE"
                    name="displaySize"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.displaySize}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="displayType"
                    className="text-gray-700 font-semibold"
                  >
                    Display Type
                  </label>
                  <input
                    type="text"
                    id="displayType"
                    placeholder="Enter DISPLAY TYPE"
                    name="displayType"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.displayType}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="displayResolution"
                    className="text-gray-700 font-semibold"
                  >
                    Display Resolution
                  </label>
                  <input
                    type="text"
                    id="displayResolution"
                    placeholder="Enter DISPLAY RESOLUTION"
                    name="displayResolution"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.displayResolution}
                    onChange={handleInputChange}
                  />

                  <span
                    className={`${
                      data.category === "mobiles" ? "block" : "hidden"
                    }  grid gap-4`}
                  >
                    <label
                      htmlFor="operatingSystem"
                      className="text-gray-700 font-semibold"
                    >
                      Operating System
                    </label>
                    <input
                      type="text"
                      id="operatingSystem"
                      placeholder="Enter Operating System Android, IOS, etc"
                      name="operatingSystem"
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                      value={data.operatingSystem}
                      onChange={handleInputChange}
                    />

                    <label
                      htmlFor="primaryCamera"
                      className="text-gray-700 font-semibold"
                    >
                      Primary Camera
                    </label>
                    <input
                      type="text"
                      id="primaryCamera"
                      placeholder="Enter Primary Camera"
                      name="primaryCamera"
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                      value={data.primaryCamera}
                      onChange={handleInputChange}
                    />

                    <label
                      htmlFor="secondaryCamera"
                      className="text-gray-700 font-semibold"
                    >
                      Secondary Camera
                    </label>
                    <input
                      type="text"
                      id="secondaryCamera"
                      placeholder="Enter Secondary Camera"
                      name="secondaryCamera"
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                      value={data.secondaryCamera}
                      onChange={handleInputChange}
                    />
                  </span>

                  <label
                    htmlFor="batteryCapacity"
                    className="text-gray-700 font-semibold"
                  >
                    Battery Capacity
                  </label>
                  <input
                    type="text"
                    id="batteryCapacity"
                    placeholder="Enter Battery Capacity"
                    name="batteryCapacity"
                    className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                    value={data.batteryCapacity}
                    onChange={handleInputChange}
                  />
                </div>

                {/* in the box */}
                <label
                  htmlFor="inTheBox"
                  className="text-gray-700 font-semibold"
                >
                  In The Box
                </label>
                <textarea
                  className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 resize-none"
                  placeholder="Enter In The Box"
                  rows={3}
                  name="inTheBox"
                  value={data.inTheBox}
                  onChange={handleInputChange}
                ></textarea>

                {/* description */}
                <label
                  htmlFor="description"
                  className="text-gray-700 font-semibold"
                >
                  description
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
                <button
                  disabled={loading}
                  className="mt-4 px-5 py-3 mb-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  {loading ? (
                    <ClipLoader loading={loading} />
                  ) : (
                    "Update Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </dialog>
        {/***display image full screen */}
        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage.url}
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;
