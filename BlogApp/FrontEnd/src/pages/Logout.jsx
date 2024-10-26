import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const nagivateTo = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      localStorage.clear();
      nagivateTo("/login");
      toast.success("User logged out");
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.message || "Logout failed");
    }
  };

  return <div onClick={handleLogout}>LOGOUT</div>;
};

export default Logout;
