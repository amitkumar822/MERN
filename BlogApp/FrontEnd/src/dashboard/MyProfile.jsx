import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";

const MyProfile = () => {
  const navigateTo = useNavigate();
  const { profile } = useAuth();
  const [deleteToggleButtonShow, setDeleteToggleButtonShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteProfile = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/users/user-delete/${profile._id}`);
      toast.success("User deleted successfully");
      localStorage.clear();
      setLoading(false);
      navigateTo("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || "Internal server error");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="relative">
            <img
              src={profile?.photo?.url}
              alt="Profile Background"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={profile?.photo?.url}
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="px-6 py-8 mt-4 text-center">
            <h2 className="text-gray-800 text-2xl font-semibold">
              {profile?.name}
            </h2>
            <p className="text-gray-600 mt-2">{profile?.email}</p>
            <p className="text-gray-600 mt-2">{profile?.phone}</p>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() =>
                  setDeleteToggleButtonShow(!deleteToggleButtonShow)
                }
                className="bg-red-500 hover:bg-red-700 duration-300 shadow-md font-semibold shadow-black px-4 py-2 rounded-lg text-white uppercase"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteToggleButtonShow && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white rounded-lg p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
              <h1 className="text-lg md:text-2xl text-gray-800 font-semibold text-center mb-4">
                Are you sure you want to delete the profile?
              </h1>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => setDeleteToggleButtonShow(false)}
                  className="bg-green-600 hover:bg-green-700 duration-300 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-600 hover:bg-red-700 duration-300 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  {loading ? <ClipLoader color="#fff" size={20} /> : "Yes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
