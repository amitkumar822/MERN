import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import userContext from "../../context/userContext.js";
import { useSelector } from "react-redux";

const Login = () => {
  const user = useSelector((state) => state?.user?.user);
  const { fetchUserDetails } = useContext(userContext);
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
              <img className="mx-auto h-[32rem] w-[32rem] rounded-full" src={"https://img.freepik.com/free-vector/woman-online-shopping_603843-3344.jpg?t=st=1739681586~exp=1739685186~hmac=b2fb39ad10d27cdf46951c99428bd4257bd38a73f4b304ca29b045d2f9d74dcc&w=740"} alt="Login" />
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
    </div>
  );
};

export default Login;
