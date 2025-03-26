import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setUserDetails } from "../../stores/UserSlice";
import API from "../../api/axiosInstance";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await API.post("/user/logout", {
        credentials: "include",
      });
      localStorage.clear();
      dispatch(setUserDetails(null));
      // navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Logged out failed try again");
    }
  };
  return <div onClick={handleLogOut}>LogOut</div>;
};

export default LogOut;
