import React, { useContext, useState } from "react";
import loginPageImage from "../../data/loginPageImage.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../context/userContext";
import { useSelector } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state?.user?.user);
  const { fetchUserDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", data);
      toast.success("Login Successfully");
      fetchUserDetails();
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
      console.error(error);
    }
  };

  // google login
  const handleGoogleLogin = async () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div>
      <section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section */}
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24 bg-white">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in to Celebration
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Create a new account
              </Link>
            </p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    placeholder="Enter email"
                    className="w-full p-4 border rounded-md bg-gray-50 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-2.5">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    placeholder="Enter password"
                    className="w-full p-4 border rounded-md bg-gray-50 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full py-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Log in
                </button>
              </div>
            </form>

            {/* Google Login */}
            <div
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full mt-4 px-6 py-3 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path fill="#FBBC05" d="M9.827 24c0-1.524.254-2.985.706-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.868 7.26 2.407 10.389L10.525 28.337c-.448-1.364-.698-2.82-.698-4.337z" />
                <path fill="#EA4335" d="M23.714 10.133c3.311 0 6.302 1.173 8.651 3.093L39.202 6.4C35.036 2.773 29.696.533 23.714.533c-9.286 0-17.268 5.311-21.09 13.071l7.91 6.04c1.822-5.531 7.017-9.51 13.181-9.51z" />
                <path fill="#34A853" d="M23.714 37.867c-6.165 0-11.36-3.978-13.182-9.51L2.623 34.395c3.822 7.761 11.804 13.072 21.091 13.072 5.732 0 11.204-2.035 15.311-5.848L31.518 35.814c-2.118 1.335-4.785 2.053-7.804 2.053z" />
                <path fill="#4285F4" d="M46.145 24c0-1.387-.214-2.88-.534-4.267H23.714v9.067H36.318c-.63 3.092-2.346 5.468-4.801 7.014l7.508 5.803c4.314-4.004 7.12-9.968 7.12-16.613z" />
              </svg>
              <span>Continue with Google</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="justify-center py-4">
          <div>
            <img className="w-full mx-auto" src={loginPageImage} alt="Login" />
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold">
                Welcome to <span className="text-pink-600">Ami</span>
                <span className="text-green-600">Shop</span>
              </h3>
              <p className="text-gray-500 mt-2">
                Explore premium products and exclusive deals. Log in now to start shopping!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in to Celebration
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Don’t have an account?
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                >
                  Create a new account
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder="Enter email to get started"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="passoword"
                        className="text-base font-medium text-gray-900"
                      >
                        Password{" "}
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"
                      >
                        {" "}
                        Forgot password?{" "}
                      </Link>
                    </div>
                    <div className="mt-2.5">
                      <input
                        id="passoword"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete="password"
                        value={data.password}
                        onChange={handleOnChange}
                        placeholder="Enter your password"
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-3 space-y-3">
                <div
                  onClick={handleGoogleLogin}
                  class="flex w-full cursor-pointer justify-center mt-2 items-center bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <svg
                    class="h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="800px"
                    height="800px"
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                  >
                    {" "}
                    <title>Google-color</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Icons"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      {" "}
                      <g
                        id="Color-"
                        transform="translate(-401.000000, -860.000000)"
                      >
                        {" "}
                        <g
                          id="Google"
                          transform="translate(401.000000, 860.000000)"
                        >
                          {" "}
                          <path
                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                            id="Fill-1"
                            fill="#FBBC05"
                          >
                            {" "}
                          </path>{" "}
                          <path
                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                            id="Fill-2"
                            fill="#EB4335"
                          >
                            {" "}
                          </path>{" "}
                          <path
                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                            id="Fill-3"
                            fill="#34A853"
                          >
                            {" "}
                          </path>{" "}
                          <path
                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                            id="Fill-4"
                            fill="#4285F4"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center py-4">
            <div>
              <img className="w-full mx-auto" src={loginPageImage} alt="" />

              <div className="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 className="text-2xl font-bold text-center text-black">
                  Welcome to{" "}
                  <span className="font-semibold text-pink-600">Ami</span>
                  <span className="font-semibold text-green-600">Shop</span>
                </h3>
                <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                  Explore a world of premium products and exclusive deals. Log
                  in now to access your account and start shopping!
                </p>

                <div className="flex items-center justify-center mt-10 space-x-3">
                  <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                  <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                  <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Login;
