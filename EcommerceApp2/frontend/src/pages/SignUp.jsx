import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import loginLogo from "../assest2/signin.gif";
import { Link } from "react-router-dom";
import ImageToBase64 from "../helpers/ImageToBase64";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePic: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageToBase64(file);

    setData((prevData) => {
      return {
        ...prevData,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data: ", data)
    try {
      const response = await axios.post("/api/user/register", data);
      console.log("Response: " + JSON.stringify(response, null, 2));
      toast.success("Signup successful. You can now login.");
      
    } catch (error) {
      toast.error(error.response?.data.message || "Internal Server Error");
      console.log(error);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginLogo} alt="login" />
            </div>
            <form>
              <label>
                <div
                  className={`text-xs bg-opacity-${
                    data.profilePic ? 40 : 80
                  } bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full`}
                >
                  {data.profilePic ? "Change Photo" : "Upload Photo"}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="pt-5 flex flex-col gap-4">
            <div className="grid">
              <label htmlFor="name">Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Your Name!"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="email">Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Your Email!"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label htmlFor="passoword">Password: </label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  id="passoword"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Your Password!"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="grid">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Your Confirm Password!"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Allready have account?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
