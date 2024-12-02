import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/UserSlice";

const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);

  // TODO: Fetch User Details
  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-details", {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      dispatch(setUserDetails(data?.data));
    } catch (error) {
      console.log(
        "Error Featching User Details ",
        error.response.data.message || "Intrnal Server Error"
      );
    }
  };

  // TODO: Add To Cart count toatl items
  const fetchCountAddToCart = async () => {
    try {
      const { data } = await axios.get("/api/user/getaddtocart", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCartProductCount(data?.data);
    } catch (error) {
      console.log(error?.response?.data?.messsage || error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCountAddToCart();
  }, []);

  return (
    <UserContext.Provider
      value={{ fetchUserDetails, cartProductCount, fetchCountAddToCart }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
