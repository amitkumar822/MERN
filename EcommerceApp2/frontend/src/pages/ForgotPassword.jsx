import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [otpSendMessage, setOtpSendMessage] = useState(true);

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

    if (!otpSendMessage) {
      toast.info("OTP send already on your emai");
    }

    if (!email) {
      toast.error("Please enter your email address!");
      return;
    }

    try {
      await axios.post("/api/captcha/generate", { email });
      setOtpSendMessage(false);
      setFormData({
        captchaMessage: "OTP Check Your Email",
      });
      navigate("/login");
      toast.success(`Successfully send OTP on your email ${email}`);
    } catch (error) {
      toast.error("Faild To Send OTP, Try Again");
      setOtpSendMessage(false);
      setFormData({
        captchaMessage: "Faild To Send OTP, Try Again",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpSendMessage) {
      toast.error("First Send OTP");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Please enter confirm password!");
      return;
    }

    const data = {
      email,
      captcha: formData.captcha,
      password: formData.newPassword,
    };

    console.log("Data: ", data);

    try {
      await axios.post("/api/user/forgotPassword", data);

      toast.success("Successfully Change Your Password");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Faild To Change Password");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-120px)] mx-auto flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              value={email}
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newpassword"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newpassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
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
              <span
                className="bg-gray-300 cursor-pointer text-sm hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGenerateCaptcha}
              >
                Send OTP
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
