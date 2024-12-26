import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderCard = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await axios.get("/api/order/get-all-confirmed-order", {
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

  // Function to toggle selected order details
  const handleViewDetails = (order) => {
    if (selectedOrder?._id === order._id) {
      setSelectedOrder(null); // Hide details if already selected
    } else {
      setSelectedOrder(order); // Show selected order details
    }
  };

  console.log(orderDetails);

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid gap-6 w-[90%] mx-auto">
        {/* Example of multiple cards */}
        {orderDetails?.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:justify-between items-center">
              <div className="flex items-start gap-4">
                <img
                  src={order?.productId[0]?.productImage[0]?.url}
                  alt="Product"
                  className="w-24 h-24 object-contain rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {order?.productId[0]?.productName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Total Items: {order?.productId.length}
                  </p>
                </div>
              </div>
              <div className="text-right lg:text-left mt-4 lg:mt-0">
                <p className="text-xl font-bold text-gray-800">
                  ₹{order?.amount.toLocaleString()}
                </p>
                <span className="text-sm text-green-500 font-medium">
                  Refund Completed
                </span>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            {/* Refund Information Section */}
            <div className="text-sm text-gray-700">
              <p>
                <strong>Refund ID:</strong> CR2412011635283536417403
              </p>
              <p className="mt-1">
                ₹3302.0 will be refunded to your Bank Account linked with
                Flipkart UPI on <strong>Dec 03</strong>.
              </p>
              <p className="mt-1">
                For any questions, please contact your bank with reference
                number <strong>433618849560</strong>.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-sm text-white font-medium rounded-md hover:bg-blue-700"
                onClick={() => handleViewDetails(order)}
              >
                {selectedOrder?._id === order._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400">
                Contact Support
              </button>
            </div>

            {/* Additional Details Section */}
            {selectedOrder?._id === order._id && (
              <div className="mt-4 bg-gray-50 p-4 rounded shadow">
                <h3 className="font-semibold text-gray-800">Product Details</h3>
                {order?.productId.map((product, idx) => (
                  <div
                    key={idx}
                    className="mt-2 flex flex-col sm:flex-row justify-between items-center gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={product?.productImage[0]?.url}
                        alt={product?.productName}
                        className="w-16 h-16 object-contain rounded-md"
                      />
                      <div>
                        <p className="text-gray-800">{product?.productName}</p>
                        <p className="text-gray-500 text-sm">
                          Quantity: {order?.quantity[idx]}
                        </p>
                        <p className="text-gray-500 text-sm">
                          price: {product?.sellingPrice}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 font-medium">
                      ₹
                      {product?.sellingPrice *
                        order?.quantity[idx].toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
        Thank you for shopping with{" "}
        <span className="font-semibold text-pink-600">Ami</span>
        <span className="font-semibold text-green-600">Shop</span>!
      </h6>
      </div>
    </div>
  );
};

export default OrderCard;
