import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

function ForgotPassword() {
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [loading, setLoading] = useState(false);
  const [otpSendMessage, setOtpSendMessage] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    captcha: "",
    captchaMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateCaptcha = async (e) => {
    e.preventDefault();

    if (!formData.newPassword) {
      toast.info("Please enter password!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Please enter confirm password!");
      return;
    }

    if (!otpSendMessage) {
      toast.info("OTP send already on your emai");
    }

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      await axios.post("/api/captcha/generate", { email });
      setOtpSendMessage(false);
      setLoading(false);

      toast.success(`Successfully send OTP on your email ${email}`);
    } catch (error) {
      toast.error("Faild To Send OTP, Try Again");
      setOtpSendMessage(false);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpSendMessage) {
      toast.error("First Send OTP");
      return;
    }

    const data = {
      email,
      captcha: formData.captcha,
      password: formData.newPassword,
    };
    setLoading(true);

    try {
      await axios.post("/api/user/forgotPassword", data);

      toast.success("Successfully Change Your Password");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Faild To Change Password");
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-[#cffadf]">
      <div className="bg-green-50 flex flex-col justify-center items-center px-5">
        <h1 className="text-3xl font-bold mb-2">Trouble Logging In?</h1>
        <p className="mb-4">
          Don't worry! Just enter your information below to reset your password.
        </p>
        <img
          src="https://objectstorage.me-dubai-1.oraclecloud.com/n/axwzijd5v1vn/b/DSL_IMAGES/o/IMAGE/b35bd369-ce03-42e9-a612-f88c70167354-roce-Photoroom.png"
          alt="Recovery"
          className="h-[300px] w-[300px]"
        />
      </div>
      <div className="flex flex-col justify-center items-start bg-green-50 px-10 py-2">
        <h2 className="md:text-3xl text-2xl font-bold mb-5">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mt-2 mb-4"
          />
          <label htmlFor="newPassword" className="font-semibold">
            New Password
          </label>
          <div className="relative w-full mb-4">
            <input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <label htmlFor="confirmPassword" className="font-semibold">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2 mb-6"
          />

          <span
            className={`${
              otpSendMessage ? "" : "hidden"
            } bg-blue-500 cursor-pointer text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors`}
            onClick={handleGenerateCaptcha}
          >
            {loading ? (
              <SyncLoader color="#fff" size={14} loading={loading} />
            ) : (
              "Reset Password"
            )}
          </span>
          <div className={`${otpSendMessage ? "hidden" : "block"}`}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="captcha"
              >
                Email OTP
              </label>
              <div className="flex items-center space-x-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="captcha"
                  type="text"
                  name="captcha"
                  placeholder="Enter OTP"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <SyncLoader color="#fff" size={14} loading={loading} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {/* <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Login
          </Link> */}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
