import { forwardRef, cloneElement, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import { useSpring, animated } from "@react-spring/web";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  //   bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function EditProfile({ user }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    dob: "",
    pincode: "",
  });

  useEffect(() => {
    setData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      address: user?.address || "",
      dob: user?.dob || "",
      pincode: user?.pincode || "",
    });
  }, [user]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //! =======👇 Country, State And City Functionality Start 👇==================
  const [country, setCountry] = useState({ isoCode: "", name: "" });
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({ isoCode: "", name: "" });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ name: "" });

  //* Transform options for React Select
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
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      dob: data.dob,
      pincode: data.pincode,
      country: country?.name || user?.country,
      state: selectedState?.name || user?.state,
      city: selectedCity?.name || user?.name,
    };

    try {
      const response = await axios.post(
        `/api/user/update-user-details/${user?._id}`,
        newData,
        {
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      toast.success("Profile updated successfully");
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  const handleDateChange = (newValue) => {
    if (newValue) {
      const formattedDate = dayjs(newValue).format('DD-MM-YYYY');
      setData((prevData) => ({ ...prevData, dob: formattedDate }));
    }
  };



  return (
    <div>
      <Button onClick={handleOpen}>
        <div className="text-2xl md:text-3xl">
          <FaEdit className="cursor-pointer" />
        </div>
      </Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <section className="my-auto md:mt-10">
              <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-white">
                  <div className="h-screen overflow-y-auto no-scrollbar">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 ">
                          Profile
                        </h1>
                        <h2 className="text-grey text-sm mb-4">
                          Update Profile
                        </h2>
                      </div>
                      <Button onClick={handleClose}>
                        <IoMdClose className="text-3xl bg-gray-300 rounded-full text-black hover:bg-gray-400 duration-300" />
                      </Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                      {/* <!-- Cover Image --> */}
                      <div className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center bg-gradient-to-r from-rose-100 to-teal-100">
                        {/* <!-- Profile Image --> */}
                        <div
                          className={`mx-auto flex justify-center w-[141px] h-[141px] rounded-full px-2 relative`}
                        >
                          <div className="absolute flex w-28 h-28 items-center justify-center sm:justify-start mt-3">
                            <img
                              src={user?.avatar?.url}
                              alt="user-avatar-image"
                              className="border-4 border-solid border-white rounded-full object-cover"
                            />
                          </div>
                          {/* <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                            <input
                              type="file"
                              name="profile"
                              id="upload_profile"
                              hidden
                              required
                            />

                            <label for="upload_profile">
                              <svg
                                data-slot="icon"
                                className="w-6 h-5 text-blue-700"
                                fill="none"
                                stroke-width="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                ></path>
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                ></path>
                              </svg>
                            </label>
                          </div> */}
                        </div>

                        {/* Background Cover Image Change Function */}
                        {/* <div className="flex justify-end">
                          <input
                            type="file"
                            name="profile"
                            id="upload_cover"
                            hidden
                            required
                          />

                          <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                            <label
                              for="upload_cover"
                              className="inline-flex items-center gap-1 cursor-pointer"
                            >
                              Cover
                              <svg
                                data-slot="icon"
                                className="w-6 h-5 text-blue-700"
                                fill="none"
                                stroke-width="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                ></path>
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                ></path>
                              </svg>
                            </label>
                          </div>
                        </div> */}
                      </div>
                      <h2 className="text-center mt-1 font-semibold">
                        Upload Profile and Cover Image
                      </h2>
                      {/* Name */}
                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                          <label htmlFor="name" className="mb-2">
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            type="text"
                            className="mt-2 p-4 w-full border-2 rounded-lg"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>

                      <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                          <label htmlFor="email" className="">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className=" p-4 w-full border-2 rounded-lg"
                            placeholder="Email"
                          />
                        </div>
                        <div className="w-full ">
                          <label htmlFor="mobile" className=" ">
                            Mobile
                          </label>
                          <input
                            id="mobile"
                            type="text"
                            name="mobile"
                            value={data.mobile}
                            onChange={handleChange}
                            className=" p-4 w-full border-2 rounded-lg"
                            placeholder="Mobile"
                          />
                        </div>
                      </div>

                      {/* Sex and DOB  */}
                      <div className="flex lg:flex-row mt-2 md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                          <label htmlFor="sex">Sex</label>
                          <select
                            className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2"
                            id="sex"
                            name="sex"
                            value={data.sex}
                            onChange={handleChange}
                          >
                            <option disabled value="">
                              Select Sex
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>

                        {/* DOB or Calendar */}
                        <div className="w-full -mt-2">
                          <label htmlFor="dob">Date Of Birth</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker
                                label="Date of Birth"
                                value={data?.dob ? dayjs(data?.dob, 'DD-MM-YYYY') : null}
                                onChange={handleDateChange}
                                disableFuture
                              />
                            </DemoContainer>
                          </LocalizationProvider>

                          {data?.dob}
                        </div>
                      </div>

                      {/* Country and State */}
                      <div className="flex lg:flex-row mt-2 md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                          <label htmlFor="country">Country</label>
                          <Select
                            id="country"
                            name="country"
                            className="cursor-pointer"
                            options={countryOptions}
                            value={countryOptions.find(
                              (option) => option.value === country.isoCode
                            )}
                            onChange={handleCountryChange}
                            placeholder="Select Country"
                          />
                        </div>

                        <div className="w-full">
                          <label htmlFor="state">State</label>
                          <Select
                            id="state"
                            name="state"
                            className="cursor-pointer"
                            options={stateOptions}
                            value={stateOptions.find(
                              (option) => option.value === selectedState.isoCode
                            )}
                            onChange={handleStateChange}
                            placeholder="Select State"
                            isDisabled={!states.length}
                          />
                        </div>
                      </div>

                      {/* City and Pin Code */}
                      <div className="flex lg:flex-row mt-2 md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                          <label htmlFor="city">City</label>
                          <Select
                            id="city"
                            name="city"
                            className="cursor-pointer"
                            options={cityOptions}
                            value={cityOptions.find(
                              (option) => option.value === selectedCity.name
                            )}
                            onChange={handleCityChange}
                            placeholder="Select City"
                            isDisabled={!cities.length}
                          />
                        </div>

                        <div className="w-full">
                          <label htmlFor="pincode">Pin Code</label>
                          <input
                            id="pincode"
                            type="text"
                            name="pincode"
                            value={data.pincode}
                            onChange={handleChange}
                            // disabled={!cities.length}
                            placeholder="Pin code..."
                            className=" p-2 w-full border-2 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="w-full mt-2">
                        <label htmlFor="address" className="mb-2">
                          Address
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={data.address}
                          onChange={handleChange}
                          className="mt-2 p-4 w-full min-h-20 max-h-52 border-2 rounded-lg"
                          placeholder="Address..."
                        />
                      </div>

                      <div className="w-full rounded-lg bg-blue-500 mt-4 mb-10 text-white text-lg font-semibold">
                        <button type="submit" className="w-full p-4">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
