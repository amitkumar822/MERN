import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import UserContext from "../../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderViewCart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchCountAddToCart } = useContext(UserContext);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/user/view-addtocart", {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      setData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const { data } = await axios.post(
        "/api/user/update-addtocart",
        { _id: id, quantity: qty + 1 },
        {
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      try {
        await axios.post(
          "/api/user/update-addtocart",
          { _id: id, quantity: qty - 1 },
          {
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/delete-addtocart",
        { _id: id },
        {
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      toast.success("Successfully Deleted");
      fetchData();

      fetchCountAddToCart();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Faild To Delete!");
      console.log(error);
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handleViewDetails = (productId) => {
    console.log("ID: " + productId);
  };

  return (
    <div>
      <div className="font-[sans-serif] bg-white h-full">
        <div className="max-w-7xl max-lg:max-w-3xl mx-auto p-6">
          {/* <h2 className="text-3xl font-extrabold text-gray-800">
            Your shopping bag
          </h2> */}

          <div className="grid lg:grid-cols-3 gap-6 relative mt-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Product image */}
              <div className="p-2 bg-white shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] rounded-md relative">
                {data?.map((product, index) => (
                  <div className="grid sm:grid-cols-2 items-center gap-4">
                    <div className="bg-gradient-to-tr from-gray-300 via-gray-100 rounded-md to-gray-50 w-full h-full p-4 shrink-0 text-center">
                      <img
                        src={product?.productId?.productImage[0]?.url}
                        className="w-56 h-full object-contain inline-block mix-blend-multiply"
                      />
                    </div>

                    <div className="p-2">
                      <h3 className="text-lg font-bold text-gray-800 capitalize">
                        {product?.productId?.productName}
                      </h3>

                      <ul className="text-sm text-gray-500 space-y-2 list-disc mt-3 line-clamp-6">
                        {product?.productId?.description}
                      </ul>

                      <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm text-gray-500">Qty:</h4>
                          <button
                            onClick={() =>
                              decraseQty(product?._id, product?.quantity)
                            }
                            type="button"
                            className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2 fill-white"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                          <span className="font-bold text-sm leading-[16px]">
                            {product?.quantity}
                          </span>
                          <button
                            onClick={() =>
                              increaseQty(product?._id, product?.quantity)
                            }
                            type="button"
                            className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2 fill-white"
                              viewBox="0 0 42 42"
                            >
                              <path
                                d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-blue-600">
                            {displayINRCurrency(
                              product?.productId?.sellingPrice
                            )}
                          </h4>
                        </div>
                      </div>

                      <div className="divide-x border-y grid grid-cols-2 text-center mt-6">
                        <Link
                          to={`/product/` + product?.productId?._id}
                          className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 fill-current mr-3 inline-block"
                            viewBox="0 0 128 128"
                          >
                            <path
                              d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          View details
                        </Link>

                        <button
                          onClick={() => deleteCartProduct(product?._id)}
                          type="button"
                          className="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current mr-3 inline-block"
                            viewBox="0 0 390 390"
                          >
                            <path
                              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                              data-original="#000000"
                            ></path>
                            <path
                              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                              data-original="#000000"
                            ></path>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white h-max rounded-md p-4 shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] sticky top-0">
              <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>

              <ul className="text-gray-500 text-sm space-y-3 mt-3">
                <li className="flex flex-wrap gap-4">
                  Quantity <span className="ml-auto font-bold">{totalQty}</span>
                </li>
                <li className="flex flex-wrap gap-4">
                  Shipping <span className="ml-auto font-bold">Free</span>
                </li>
                <li className="flex flex-wrap gap-4">
                  Tax <span className="ml-auto font-bold">Free</span>
                </li>
                <li className="flex flex-wrap gap-4 font-bold">
                  Total{" "}
                  <span className="ml-auto">
                    {displayINRCurrency(totalPrice)}
                  </span>
                </li>
              </ul>

              <div className="w-full mt-6">
                <Link to={"/payment-form"}>
                  <div className="flex justify-center items-center text-sm md:text-xl px-6 py-3 w-full bg-blue-700 hover:bg-blue-800 tracking-wide text-white rounded-md">
                    Make Payment
                  </div>
                </Link>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3">
                    Secure payment
                  </h4>
                  <p className="text-sm text-gray-500">
                    Experience peace of mind with our secure payment options,
                    ensuring your transactions are protected and reliable.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3">
                    Free delivery
                  </h4>
                  <p className="text-sm text-gray-500">
                    Enjoy the convenience of free delivery on all your orders,
                    providing a cost-effective and seamless shopping experience.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3">
                    Easy to return
                  </h4>
                  <p className="text-sm text-gray-500">
                    Simplify your shopping experience with hassle-free returns.
                    Our easy return process ensures convenience and customer
                    satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderViewCart;
