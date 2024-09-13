import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    // console.log("FormD: " + JSON.stringify(userInfo, null, 2));

    await axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log("Response: " + JSON.stringify(response.data, null, 2));
        if (response.data) {
          toast.success("Login Successful");
        }

        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        console.log("LoginError: " + error);
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
          <h2 className="text-xl font-semibold text-yellow-400 uppercase">
            Login
          </h2>

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
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}

          <br />
          {/* Text and button */}
          <div className="flex justify-between items-center">
            <p>
              New User?{" "}
              <Link
                to="/signup"
                className="text-green-400 uppercase font-bold cursor-pointer underline"
              >
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="bg-blue-500 py-1 px-2 font-bold uppercase italic rounded-md shadow-md shadow-[yellow] cursor-pointer hover:bg-blue-600 hover:text-gray-200 duration-300"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
