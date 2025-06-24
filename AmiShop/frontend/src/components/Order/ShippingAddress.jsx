import React, { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import SyncLoader from "react-spinners/SyncLoader";
import logo from "../../data/logo.png";
import API from "../../api/axiosInstance";

const ShippingAddress = ({
  totalPrice,
  allProductId,
  quantity,
  setShowModalComponent,
}) => {
  const [loading, setLoading] = useState(false);
  // State management for inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  //! =======👇 Country, State And City Functionality Start 👇==================
  // Country, State, and City State Management
  const [country, setCountry] = useState({ isoCode: "", name: "" });
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({ isoCode: "", name: "" });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ name: "" });

  // Transform options for React Select
  const countryOptions = Country.getAllCountries()?.map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states?.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cityOptions = cities?.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  const handleCountryChange = (selectedOption) => {
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.isoCode === selectedOption.value
    );
    setCountry({
      isoCode: selectedCountry.isoCode,
      name: selectedCountry.name,
    });
    setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    setSelectedState({ isoCode: "", name: "" });
    setCities([]);
    setSelectedCity({ name: "" });
  };

  const handleStateChange = (selectedOption) => {
    const selectedState = states.find(
      (state) => state.isoCode === selectedOption.value
    );
    setSelectedState({
      isoCode: selectedState.isoCode,
      name: selectedState.name,
    });
    setCities(City.getCitiesOfState(country.isoCode, selectedState.isoCode));
    setSelectedCity({ name: "" });
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity({ name: selectedOption.value });
  };
  //! =======�� Country, State And City Functionality End ��==================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Data format for place order
  const newData = {
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
    address: formData.address,
    pincode: formData.pincode,
    country: country.name,
    state: selectedState.name,
    city: selectedCity.name,
    amount: totalPrice,
    productId: allProductId,
    quantity: quantity,
  };

  const handleOnliePay = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.get("/order/razorpay-key");
      const rezorPayKey = response?.data?.data;

      const { data } = await API.post(
        "/order/create-online-pay",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // close modal
      document.getElementById("shippingAddress_modal").close();

      const options = {
        key: rezorPayKey,
        amount: data?.data?.amount,
        currency: "INR",
        // currency: data?.currency,
        name: "AmiShop",
        description: "Test Transaction",
        image: { logo }, //! LOGO
        order_id: data?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "/order/payment-verification",
        prefill: {
          name: "",
          // name: "Amit Kumar",
          email: "",
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new Razorpay(options);
      console.log("rzp-Open1: ", rzp);
      rzp.open();

      toast.success("Successfully your transaction");

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      console.log("Failed to open transaction");
      toast.error("Failed to checkout. Please try again.");
    }
  };

  const [loadingCOD, setLoadingCOD] = useState(false);

  const handleCashPay = async (e) => {
    e.preventDefault();
    setLoadingCOD(true);
    try {
      const { data } = await API.post("/order/create-cod-pay", newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowModalComponent(false);
      toast.success("Successfully processed with cash on delivery");
      setShowModalComponent(false);
      console.log(data);
    } catch (error) {
      console.error(error);
      setLoadingCOD(false);
      toast.error("Failed to process with cash on delivery. Please try again.");
    }
  };

  return (
    <>
      <dialog id="shippingAddress_modal" className="modal">
        <div className="md:w-[50%] w-[97%] relative p-4 h-[90vh] md:pt-8 overflow-auto bg-white rounded-xl">
          <form method="dialog" className="bg-yellow-300">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setShowModalComponent(false)}
              className="btn btn-sm border border-gray-400 btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div>
            <h2 className="xl:text-3xl md:text-2xl text-xl font-bold text-center mb-6">
              Shipping Address
            </h2>

            <form className="space-y-5">
              {/* Name */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaUser className="mr-3 text-blue-500" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full text-lg"
                  required
                />
              </div>
              {/* Email */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaEnvelope className="mr-3 text-blue-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full text-lg"
                  required
                />
              </div>
              {/* Mobile */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaMobileAlt className="mr-3 text-blue-500" />
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="input input-bordered w-full text-lg"
                  required
                />
              </div>
              {/* Country */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" />
                  Country
                </label>
                <Select
                  options={countryOptions}
                  value={countryOptions.find(
                    (option) => option.value === country.isoCode
                  )}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  className="text-lg"
                />
              </div>
              {/* State */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" />
                  State
                </label>
                <Select
                  options={stateOptions}
                  value={stateOptions.find(
                    (option) => option.value === selectedState.isoCode
                  )}
                  onChange={handleStateChange}
                  placeholder="Select State"
                  className="text-lg"
                  isDisabled={!states.length}
                />
              </div>
              {/* City */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" />
                  City
                </label>
                <Select
                  options={cityOptions}
                  value={cityOptions.find(
                    (option) => option.value === selectedCity.name
                  )}
                  onChange={handleCityChange}
                  placeholder="Select City"
                  className="text-lg"
                  isDisabled={!cities.length}
                />
              </div>
              {/* Pincode */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" />
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter your pincode"
                  className="input input-bordered w-full text-lg"
                  required
                />
              </div>
              {/* Address */}
              <div className="form-control">
                <label className="label flex items-center justify-start text-lg font-semibold">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  className="textarea textarea-bordered w-full text-lg"
                  rows="3"
                  required
                ></textarea>
              </div>
            </form>

            {/* Payment Button */}
            <div className=" mt-6 flex items-center justify-around">
              <button
                onClick={handleOnliePay}
                disabled={loading || loadingCOD}
                className="btn btn-primary text-lg w-[40%]"
              >
                {loading ? (
                  <SyncLoader color="#fff" size={14} loading={loading} />
                ) : (
                  "Online Pay"
                )}
              </button>

              <button
                onClick={handleCashPay}
                disabled={loading || loadingCOD}
                className="btn bg-green-600 hover:bg-green-700 duration-200 ease-in-out text-white text-lg w-[40%]"
              >
                {loadingCOD ? (
                  <SyncLoader color="#fff" size={14} loading={loadingCOD} />
                ) : (
                  "Cash Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ShippingAddress;
