import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setUserDetails } from "../../stores/UserSlice";
import API from "../../api/axiosInstance";
import { useContext } from "react";
import userContext from "../../context/userContext";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setCartProductCount } = useContext(userContext);

  const handleLogOut = async () => {
    try {
      await API.post("/user/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      dispatch(setUserDetails(null));
      setCartProductCount(0)
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Logged out failed try again");
    }
  };
  return <div onClick={handleLogOut}>LogOut</div>;
};

export default LogOut;
