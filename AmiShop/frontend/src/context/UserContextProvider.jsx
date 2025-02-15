import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../stores/UserSlice";
import userContext from "./userContext.js";

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

  // TODO: User Review come to Review Page
  const [userReview, setUserReview] = useState([]);

  return (
    <userContext.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchCountAddToCart,
        userReview,
        setUserReview,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
