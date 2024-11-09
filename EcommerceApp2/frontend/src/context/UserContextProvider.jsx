import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserDetails } from "../store/userSlice";

const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch()

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-details", {
        credentials: "include",
      });

      dispatch(setUserDetails(data?.user));
    } catch (error) {
      console.log(
        "Error Featching User Details ",
        error.response.data.message || "Intrnal Server Error"
      );
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
