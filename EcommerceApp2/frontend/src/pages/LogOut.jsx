import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      await axios.post("/api/user/logout", {
        credentials: "include",
      });
      navigate("/login");
      dispatch(setUserDetails(""));
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Logged out failed try again");
    }
  };
  return <div onClick={handleLogOut}>LogOut</div>;
};

export default LogOut;
