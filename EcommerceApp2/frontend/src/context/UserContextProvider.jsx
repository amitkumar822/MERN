import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-details", {
        credentials: "include",
      });
      setUserDetails(data);
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
    <UserContext.Provider
      value={{ userDetails, fetchUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
