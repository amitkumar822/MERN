import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

function Signup() {
  const [authUser, setAuthUser] = useAuth();

  // ======👇 Field is required Message 👇======
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch password and confirm password
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  // validate password and confirm password
  const validatePasswordMatch = (value) => {
    return value === password || "Password and confirm password do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullName: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        console.log("Response: " + JSON.stringify(response.data, null, 2));

        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        console.log("Signup Error: " + error);
        if (error.response) {
          toast.error(error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center text-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-96 border p-4 rounded-md"
        >
          <h1 className="text-2xl font-semibold text-center">
            Chat <span className="text-green-500">App</span>
          </h1>
          <h2 className="text-xl font-semibold">
            <span className="text-yellow-400">Sign</span>Up
          </h2>
          <br />
          {/* fullName */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </label>
          {errors.username && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}

          <br />
          {/* email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}

          <br />
          {/* password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password", {
                required: true,
              })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}

          <br />
          {/* confirm password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}

          <br />
          {/* Text and button */}
          <div className="flex justify-between items-center">
            <p>
              Have an account?{" "}
              <Link to="/login" className="text-green-400 uppercase font-bold cursor-pointer underline">
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 py-1 px-2 font-bold uppercase italic rounded-md shadow-md shadow-[yellow] cursor-pointer hover:bg-blue-600 hover:text-gray-200 duration-300"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
