import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const fetchProfile = async () => {
    try {
      // const token = Cookies.get("token");
      // const parseToken = token ? JSON.parse(token) : undefined; // Potential issue here if token is a plain string
      // console.log("Token: ", token);

      // if (parseToken) {
      const { data } = await axios.get("/api/users/get-my-profile", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${parsedToken.token}`
        },
      });
      // console.log("fProfile: ", data);
      setProfile(data.user);
      setIsAuthenticated(true);
      localStorage.setItem("profile", JSON.stringify(data.user));
      localStorage.setItem("isAuthenticated", true);
      // }
    } catch (error) {
      console.log("AuthBlogs error: ", error.message);
    }
  };

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blogs/get-all-blogs");
      setBlogs(data.blogs);
    } catch (error) {
      console.log("AuthBlogs error: ", error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
      fetchBlogs();
    }
  }, [isAuthenticated]);

  // get information by localstorage
  useEffect(() => {
    const savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
      setIsAuthenticated(true);
    }

    const savedUerProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedUerProfile) {
      setProfile(savedUerProfile);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUserInfo,
        fetchProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
