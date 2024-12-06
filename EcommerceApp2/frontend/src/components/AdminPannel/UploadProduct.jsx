import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductCategory from "../../helpers/ProductCategory";
import { toast } from "react-toastify";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import DisplayImage from "../DisplayImage";

const UploadProduct = () => {
  let [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    productName: "",
    description: "",
    price: "",
    sellingPrice: "",
    brand: "",
    category: "",
    productPreviewImage: [], // URLs for display
    productImage: [],
    quantity: "",
    inTheBox: "",
    ram: "",
    ssd: "",
    processorType: "",
    processorSpeed: "",
    displaySize: "",
    displayType: "",
    displayResolution: "",
    operatingSystem: "",
    primaryCamera: "",
    secondaryCamera: "",
    batteryCapacity: "",
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

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.warning("You can only upload a maximum of 5 images.");
      return;
    }

    // Create URLs for display and add files to imageFiles state for upload
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    const imagesArray2 = files.map((file) => file);

    setData((prevData) => ({
      ...prevData,
      productPreviewImage: [...prevData.productPreviewImage, ...imagesArray],
      productImage: [...prevData.productImage, ...imagesArray2],
    }));
  };

  const handleRemoveImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      productPreviewImage: prevData.productPreviewImage.filter(
        (_, i) => i !== index
      ),
      productImage: prevData.productImage.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a new FormData object
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data?.description);
    formData.append("price", parseFloat(data?.price));
    formData.append("sellingPrice", parseFloat(data?.sellingPrice));
    formData.append("brand", data?.brand);
    formData.append("category", data?.category);
    formData.append("quantity", parseInt(data?.quantity));
    formData.append("inTheBox", data?.inTheBox);
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
    data?.productImage?.forEach((file) => {
      formData.append("productImage", file);
    });

    try {
      await axios.post("/api/product/upload", formData);
      setLoading(false);
      toast.success("Product Uploaded Successfully!");
      document.getElementById("my_uploadProduct_modal").close();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Faild To Upload Product, Try Again!"
      );
    }
  };

  console.log(data);

  // Big Screen Display Single Image
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  return (
    <div>
      <dialog id="my_uploadProduct_modal" className="modal capitalize">
        <div className="modal-box max-h-[calc(100vh-120px)] overflow-hidden bg-white shadow-lg rounded-lg">
          {/* Header section */}
          <div className="relative pb-3 border-b">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-600 hover:bg-gray-200"
              onClick={() =>
                document.getElementById("my_uploadProduct_modal").close()
              }
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center text-blue-600">
              Upload Product
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
              <label htmlFor="product" className="text-gray-700 font-semibold">
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
              <label
                htmlFor="productPreviewImage"
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
                {data.productPreviewImage.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(image);
                        document.getElementById("my_modal_4").showModal();
                      }}
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="w-20 h-20 object-cover rounded-full border border-black cursor-pointer"
                    />
                    <span
                      onClick={() => handleRemoveImage(index)}
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
                min={1}
                className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300"
                value={data.sellingPrice}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="quantity" className="text-gray-700 font-semibold">
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
                  }`}
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

              <label htmlFor="inTheBox" className="text-gray-700 font-semibold">
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
                {loading ? <ClipLoader loading={loading} /> : "Upload Product"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
