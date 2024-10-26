import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthProvider";

const Login = () => {
  const navigateTo = useNavigate();

  const { setIsAuthenticated, setUserInfo, fetchProfile } = useAuth();
  // console.log("profileLogin", profile)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if ([email, password, role].some((field) => field.trim() === "")) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    try {
      const { data } = await axios.post("/api/users/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Login success");
      // Fetch profile before navigating
      await fetchProfile();
      navigateTo("/");
      // console.log("response: ", data?.user);

      setEmail("");
      setPassword("");
      setRole("");

      setIsAuthenticated(true);
      setUserInfo(data.user);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      // localStorage.setItem("isAuthenticated", true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Internal Server Error");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="font-semibold text-xl items-center text-center">
              Ami<span className="text-blue-500">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <p className="text-center mb-4">
              New User?{" "}
              <Link to="/register" className="text-blue-600">
                Register Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
