import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../stores/UserSlice";
import userContext from "./userContext.js";
import API from "../api/axiosInstance.js";

const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);

  //* Fetch User Details
  const fetchUserDetails = async () => {
    try {
      const { data } = await API.get("/user/get-user-details", {
        credentials: "include",
        withCredentials: true,
        headers: {
          "content-type": "application/json",
        },
      });
      dispatch(setUserDetails(data?.data));
    } catch (error) {
      console.log(
        "Error Fetching User Details ",
        error.response.data.message || "Internal Server Error"
      );
    }
  };

  //* Add To Cart count toatl items
  const fetchCountAddToCart = async () => {
    try {
      const { data } = await API.get("/user/getaddtocart", {
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

  //^ User Review come to Review Page
  const [userReview, setUserReview] = useState([]);

  return (
    <userContext.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchCountAddToCart,
        userReview,
        setUserReview,
        setCartProductCount
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
