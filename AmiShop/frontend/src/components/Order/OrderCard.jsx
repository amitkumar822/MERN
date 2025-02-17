import React, { useEffect, useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import API from "../../api/axiosInstance";

const OrderCard = () => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await API.get("/order/get-all-confirmed-order", {
        headers: { "Content-Type": "application/json" },
      });
      setOrderDetails(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleViewDetails = (order) => {
    if (selectedOrder?._id === order._id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = ({ order }) => {
    navigator.clipboard.writeText(order?._id || "");
    setCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-100 md:p-4 mt-2">
      <div className="grid gap-6 md:w-[90%] w-[96%] mx-auto">
        {/* Example of multiple cards */}
        {orderDetails?.length > 0 ? (
          orderDetails?.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg md:p-6 p-2 transition-transform transform md:hover:scale-95 hover:drop-shadow-2xl"
            >
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row lg:justify-between items-center">
                <div className="flex items-start gap-4">
                  <img
                    src={order?.productId[0]?.productImage[0]?.url}
                    alt="Product"
                    className="md:w-24 md:h-24 w-14 h-14 object-contain rounded-md"
                  />
                  <div>
                    <h2 className="md:text-lg text-xs font-medium text-gray-800 line-clamp-2">
                      {order?.productId[0]?.productName}
                    </h2>
                    <p className="md:text-sm text-[12px] text-gray-600 mt-1 flex gap-1">
                      <p className="font-medium">Total Items:</p>{" "}
                      {order?.productId.length}
                    </p>
                  </div>
                </div>

                <div className="text-right lg:text-left text-sm w-full flex justify-end">
                  <div className="space-y-4">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="uppercase text-white bg-gradient-to-r from-green-400 to-green-600 px-3 py-1 rounded-lg shadow-md">
                        {order?.paymentMethod}
                      </span>
                    </div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-white bg-gradient-to-r from-blue-400 to-blue-600 px-3 py-1 rounded-lg shadow-md">
                        ₹{order?.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                      <span className="text-gray-600">Order Status:</span>
                      <span
                        className={`capitalize px-3 py-1 rounded-lg shadow-md ${
                          order?.status === "confirmed"
                            ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                            : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                        }`}
                      >
                        {order?.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="text-right lg:text-left text-[12px] w-full flex justify-end">
                  <div className="space-y-3">
                    <div className="font-medium md:text-base  text-gray-800">
                      <span>Payment Method:</span>
                      <span className="uppercase text-lime-900 bg-lime-100 px-2 py-1 rounded-md">
                        {order?.paymentMethod}
                      </span>
                    </div>
                    <div className="font-medium md:text-base  text-gray-800">
                      <span>Total Amount:</span>
                      <span className="uppercase text-blue-900 bg-blue-100 px-2 py-1 rounded-md">
                        ₹{order?.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="md:text-sm text-[12px]  font-medium capitalize">
                      <span className="font-medium md:text-base">
                        Order Status:
                      </span>{" "}
                      <span className="bg-green-100 text-green-700 md:px-2 px-1 md:py-1 rounded">
                        {order?.status}
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>

              <hr className="md:my-4 my-1 border-gray-200" />

              {/* Refund Information Section */}
              <div className="md:text-sm text-[12px] text-gray-700">
                <p>
                  <strong className="text-pink-600">Hello,</strong>{" "}
                  <span className="font-semibold md:text-lg text-xs text-green-600">
                    {order?.name}
                  </span>
                </p>
                <p className="mt-1 flex items-center gap-2">
                  <strong>Order Id: </strong>
                  <span className="font-medium bg-gray-200 text-gray-800 md:px-2 md:py-1 px-1 py-[2px] rounded">
                    {order?._id}
                  </span>
                  <button
                    onClick={() => handleCopy({ order })}
                    className="text-gray-600 hover:text-gray-800 transition"
                    title="Copy Order ID"
                  >
                    {copied ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaRegCopy />
                    )}
                  </button>
                </p>
                <div className="mt-2 flex md:space-x-10 space-x-4">
                  <div className="box group">
                    <p className="font-semibold md:text-base text-xs md:leading-7 text-gray-800 md:mb-1 transition-all duration-500 group-hover:text-gray-700">
                      Country
                    </p>
                    <h6 className=" font-manrope md:text-base text-xs leading-9 text-gray-500">
                      {order?.country}
                    </h6>
                  </div>

                  <div className="box group">
                    <p className="font-semibold md:text-base text-xs md:leading-7 text-gray-800 md:mb-1 transition-all duration-500 group-hover:text-gray-700">
                      State
                    </p>
                    <h6 className=" font-manrope md:text-base text-xs leading-9 text-gray-500">
                      {order?.state}
                    </h6>
                  </div>
                  <div className="box group">
                    <p className="font-semibold md:text-base text-xs md:leading-7 text-gray-800 md:mb-1 transition-all duration-500 group-hover:text-gray-700">
                      City
                    </p>
                    <h6 className=" font-manrope md:text-base text-xs leading-9 text-gray-500">
                      {order?.city}
                    </h6>
                  </div>
                  <div className="box group">
                    <p className="font-semibold md:text-base text-xs md:leading-7 text-gray-800 md:mb-1 transition-all duration-500 group-hover:text-gray-700">
                      Full Address
                    </p>
                    <h6 className=" font-manrope md:text-base text-xs leading-9 text-gray-500">
                      {order?.address}
                    </h6>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="md:mt-6 mt-4 flex justify-end md:gap-4 gap-2">
                <button
                  className="md:px-4 px-2 md:py-2 py-1 bg-blue-600 md:text-sm text-xs text-white font-medium rounded-md hover:bg-blue-700"
                  onClick={() => handleViewDetails(order)}
                >
                  {selectedOrder?._id === order._id
                    ? "Hide Details"
                    : "View Details"}
                </button>
                <button className="md:px-4 px-2 md:py-2 py-1 bg-gray-300 text-gray-700 md:text-sm text-xs font-medium rounded-md hover:bg-gray-400">
                  Contact Support
                </button>
              </div>

              {/* Additional Details Section */}
              {selectedOrder?._id === order._id && (
                <div className="mt-4 bg-gray-50 md:p-4 p-2 rounded shadow">
                  <h3 className="md:font-semibold font-medium text-gray-800">
                    Product Details
                  </h3>
                  {order?.productId.map((product, idx) => (
                    <div
                      key={idx}
                      className="mt-2 flex flex-col sm:flex-row justify-between items-center gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={product?.productImage[0]?.url}
                          alt={product?.productName}
                          className="md:w-16 md:h-16 w-14 h-14 object-contain rounded-md"
                        />
                        <div>
                          <p className="text-gray-900 font-medium md:text-base text-xs line-clamp-2">
                            {product?.productName}
                          </p>
                          <p className="text-gray-500 md:text-sm text-xs flex items-center gap-1">
                            <p className="text-gray-900 font-medium">
                              Quantity:
                            </p>{" "}
                            {order?.quantity[idx]}
                          </p>
                          <p className="text-gray-500 md:text-sm text-xs flex items-center gap-1">
                            <p className="text-gray-900 font-medium capitalize">
                              price:
                            </p>
                            ₹{(product?.sellingPrice).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-800 font-medium w-full flex justify-end pr-4">
                        ₹
                        {(
                          product?.sellingPrice * order?.quantity[idx]
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-full h-[90vh] flex flex-col justify-center items-center bg-gray-50">
            <div className="text-center">
              {/* Updated SVG icon for better representation */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-400 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m-8 6h10a2 2 0 002-2V6a2 2 0 00-2-2h-3.5L10 2H7a2 2 0 00-2 2v16a2 2 0 002 2z"
                />
              </svg>
              <h2 className="text-3xl font-semibold text-gray-700 mt-4">
                No Orders Found
              </h2>
              <p className="text-gray-500 mt-2">
                You haven’t placed any orders yet. Browse our products and make
                your first purchase!
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 shadow-md transition duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        )}
        <h6 className="font-manrope md:font-bold font-semibold md:text-2xl leading-9 text-black mb-3">
          Thank you for shopping with{" "}
          <span className="font-semibold text-pink-600">Ami</span>
          <span className="font-semibold text-green-600">Shop</span>!
        </h6>
      </div>
    </div>
  );
};

export default OrderCard;
