import React, { useEffect, useState } from "react";
import axios from "axios";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // View Order Hidden and Show Order functionality
  const [showOrders, setShowOrders] = useState(
    Array(orderDetails.length).fill(false)
  );

  const toggleShowOrder = (index) => {
    setShowOrders((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  //! Cancle Order
  const handleCancelOrder = async (orderId) => {
    setLoading(true);

    try {
      const { data } = await axios.post(`/api/order/cancel-order`, { orderId });

      fetchOrderDetails();
      setLoading(false);
      toast.success("Order cancelled successfully");
    } catch (error) {
      // console.error(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Faild to cancled order");
    }
  };

  return (
    <>
      <section className="py-2 relative bg-zinc-200">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          {/* Items Order section */}

          {orderDetails &&
            orderDetails.map((orderItems, index) => (
              <div
                key={orderItems._id}
                className="border-b-2 border-black mb-4"
              >
                <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
                  {/* Your Order Confirmed */}
                </h2>
                <h6 className="font-medium text-xl leading-8 text-black mb-3">
                  Hello,{" "}
                  <span className="font-semibold italic text-[blue]">
                    {orderItems?.name}
                  </span>
                  <div>
                    Order Number:
                    <span className="ml-2 text-[#51515a]">{index + 1}</span>
                  </div>
                  <div>
                    OrderId:
                    <span className="ml-2 text-[#51515a]">
                      {orderItems._id}{" "}
                    </span>
                  </div>
                  <div>
                    RazorPay Order Id:
                    <span className="ml-2 text-[#51515a]">
                      {orderItems.razorpay_order_id}{" "}
                    </span>
                  </div>
                  <div>
                    Status:
                    <span
                      className={`${
                        orderItems?.status === "created"
                          ? "bg-green-200 text-[green] border-green-400"
                          : "hidden"
                      } py-1 px-2  rounded-full uppercase text-sm font-semibold ml-2 border`}
                    >
                      {orderItems?.status}
                    </span>
                    <span
                      className={`${
                        orderItems?.status !== "created"
                          ? "bg-red-200 text-[red] border-red-400"
                          : "hidden"
                      } py-1 px-2  rounded-full uppercase text-sm font-semibold ml-2 border`}
                    >
                      cancelled
                    </span>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      onClick={() => toggleShowOrder(index)}
                      className="text-blue-600 hover:text-blue-700 duration-200 bg-white shadow-md shadow-gray-500 hover:shadow-zinc-600 px-2 py-1 rounded-full cursor-pointer"
                    >
                      {showOrders[index] ? "Hide Order" : "View Order"}
                    </div>
                  </div>
                </h6>
                <p className="font-normal text-lg leading-8 text-gray-500 mb-11 -mt-10">
                  Your order has been completed and be delivery in only two
                  days.
                </p>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    showOrders[index] ? "block" : "hidden"
                  } overflow-hidden`}
                >
                  <h1 className="md:text-xl font-semibold uppercase">
                    Address
                  </h1>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
                    <div className="box group">
                      <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                        Country
                      </p>
                      <h6 className="font-semibold font-manrope md:text-xl leading-9 text-black">
                        {orderItems?.country}
                      </h6>
                    </div>
                    <div className="box group">
                      <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                        State
                      </p>
                      <h6 className="font-semibold font-manrope md:text-xl leading-9 text-black">
                        {orderItems?.state}
                      </h6>
                    </div>
                    <div className="box group">
                      <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                        City
                      </p>
                      <h6 className="font-semibold font-manrope md:text-xl leading-9 text-black">
                        {orderItems?.city}
                      </h6>
                    </div>
                    <div className="box group">
                      <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                        Address
                      </p>
                      <h6 className="font-semibold font-manrope md:text-xl text-black line-clamp-3">
                        {orderItems?.address}
                      </h6>
                    </div>
                  </div>

                  {/* Porduct Items */}
                  {orderItems?.productId.map((itemsDetails, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
                        <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                          <img
                            src={itemsDetails?.productImage[0]?.url}
                            alt={itemsDetails?.productName}
                            className="w-full rounded-xl object-cover mix-blend-multiply"
                          />
                        </div>
                        <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                          <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                            <div className>
                              <h5 className="font-manrope font-semibold md:text-2xl text-xl leading-9 text-black mb-6">
                                {itemsDetails?.productName}
                              </h5>
                              <p className="font-normal text-xl leading-8 text-gray-500">
                                Quantity :{" "}
                                <span className="text-black font-semibold">
                                  {orderItems?.quantity[index]}
                                </span>
                              </p>
                            </div>
                            <h5 className="font-manrope font-semibold md:text-2xl leading-10 text-black sm:text-right mt-3">
                              {displayINRCurrency(
                                parseInt(itemsDetails?.sellingPrice) *
                                  parseInt(orderItems?.quantity[index])
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center sm:justify-end w-full my-6">
                    <div className=" w-full">
                      <div className="flex items-center justify-between mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-500">
                          Total number of items
                        </p>
                        <p className="font-semibold text-xl leading-8 text-gray-600">
                          {orderItems?.quantity?.length}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-500">
                          Shipping Charge
                        </p>
                        <p className="font-semibold text-xl leading-8 text-gray-600">
                          Free
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-500">
                          Taxes
                        </p>
                        <p className="font-semibold text-xl leading-8 text-gray-600">
                          Free
                        </p>
                      </div>
                      <div className="flex items-center justify-between py-6 border-y border-gray-100">
                        <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                          Total
                        </p>
                        <p className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                          {displayINRCurrency(orderItems?.amount)}
                        </p>
                      </div>
                      <div className="flex items-center justify-center sm:justify-end w-full mt-2">
                        <button
                          className={`${
                            orderItems.status === "created" ? "flex" : "hidden"
                          }  bg-red-600 min-w-20 min-h-9 flex justify-center items-center hover:bg-red-700 transition-all ease-in-out duration-300 shadow-md shadow-zinc-600 md:text-xl py-1 px-2 text-white font-semibold rounded-full`}
                        >
                          {loading ? (
                            <SyncLoader
                              color="#fff"
                              size={14}
                              loading={loading}
                              title="please wait..."
                            />
                          ) : (
                            <sapn
                              onClick={() =>
                                handleCancelOrder(orderItems?.razorpay_order_id)
                              }
                            >
                              Cancle Order
                            </sapn>
                          )}
                        </button>

                        <div
                          className={`${
                            orderItems.status !== "created" ? "flex" : "hidden"
                          } bg-green-600 capitalize hover:bg-green-700 transition-all ease-in-out duration-300 shadow-md shadow-zinc-600 md:text-xl py-1 px-2 text-white font-semibold rounded-full`}
                        >
                          Refund completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Thanku Message Section */}
          <div className="data ">
            <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
              We'll be sending a shipping confirmation email when the items
              shipped successfully.
            </p>
            <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
              Thank you for shopping with{" "}
              <span className="font-semibold text-pink-600">Ami</span>
              <span className="font-semibold text-green-600">Shop</span>!
            </h6>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;
