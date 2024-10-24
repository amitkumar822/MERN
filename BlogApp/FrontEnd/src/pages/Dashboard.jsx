import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import MyBlogs from "../dashboard/MyBlogs";

const Dashboard = () => {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();

  const [component, setComponent] = useState("My Blog");

  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Update Blog" ? (
        <UpdateBlog />
      ) : (
        <MyBlogs />
      )}
    </div>
  );
};

export default Dashboard;
