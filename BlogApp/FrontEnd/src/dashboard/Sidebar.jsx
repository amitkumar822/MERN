import React, { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useNavigate } from "react-router";
import { CgMenuGridO } from "react-icons/cg";
import { BsBoxArrowLeft } from "react-icons/bs";
import Logout from "../pages/Logout";

const Sidebar = ({ component, setComponent }) => {
  const navigateTo = useNavigate();
  const { profile, isAuthenticated } = useAuth();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const handleHome = () => {
    navigateTo("/");
  };

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div
        className={`sm:hidden fixed top-4 left-4 z-50 ${show ? "hidden" : ""}`}
        onClick={() => setShow(!show)}
      >
        <CgMenuGridO className="text-2xl cursor-pointer" />
      </div>

      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 pt-5 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 z-10 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer flex justify-end"
          onClick={() => setShow(!show)}
        >
          <BsBoxArrowLeft className="text-2xl" />
        </div>
        <div className="text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2"
            src={profile?.photo?.url}
            alt="profle"
          />
          <p className="text-lg font-semibold">{profile?.name}</p>
        </div>
        <ul className="space-y-6 mx-4">
          <button
            onClick={() => handleComponents("My Blog")}
            className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            CREATE BLOGS
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            MY PROFILE
          </button>
          <button
            onClick={handleHome}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300"
          >
            HOME
          </button>
          <button className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300">
            <Logout />
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
