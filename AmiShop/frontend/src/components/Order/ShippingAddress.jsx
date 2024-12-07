import React, { useState } from "react";
import axios from "axios";
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
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const cityOptions = cities.map((city) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    try {
      const respomse = await axios.get("/api/order/razorpay-key");
      const rezorPayKey = respomse?.data?.data;

      const { data } = await axios.post("/api/order/checkout", newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // close modal
      document.getElementById("shippingAddress_modal").close();

      const options = {
        key: rezorPayKey, // Enter the Key ID generated from the Dashboard
        amount: data?.data?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        // currency: data?.currency,
        name: "AmiShop",
        description: "Test Transaction",
        image: {logo}, //! LOGO
        order_id: data?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "/api/order/payment-verification",
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
      rzp.open();

      toast.success("Successfully your transaction");

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to checkout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <dialog id="shippingAddress_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setShowModalComponent(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center mb-6">
              Shipping Address
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
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
              {/* Submit Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full text-lg">
                  {loading ? (
                    <SyncLoader color="#fff" size={14} loading={loading} />
                  ) : (
                    "Confirm Order"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShippingAddress;
