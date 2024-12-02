import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user);

  // if(!user?.name) {
  //   useEffect(() => {
  //     navigate("/login");
  //   })
  // }

  return (
    <div className="container mx-auto">
      <section className="relative pt-40 pb-24">
        {/* Cover Image Background */}
        <div className="w-full absolute top-0 left-0 z-0 h-60 bg-gradient-to-r from-rose-100 to-teal-100"></div>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          {/* User Image */}
          <div className="flex w-32 h-32 md:w-40 md:h-40 items-center justify-center sm:justify-start relative z-10 mb-5">
            <img
              src={user?.avatar?.url}
              alt="user-avatar-image"
              className="border-4 border-solid border-white rounded-full object-cover"
            />
          </div>

          {/* Name, Email, State or User Details */}
          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              {/* User Name */}
              <h3 className="font-manrope font-bold text-4xl text-gray-800 mb-3">
                {user?.name}
              </h3>

              {/* User Details */}
              <div className="text-gray-600 space-y-2">
                {/* Email */}
                <p className="flex items-center gap-2">
                  <span className="material-icons text-blue-500">email</span>
                  <span className="font-medium">
                    {user?.email || "No Email Provided"}
                  </span>
                </p>

                {/* Mobile */}
                {user?.mobile && (
                  <p className="flex items-center gap-2">
                    <span className="material-icons text-green-500">phone</span>
                    <span className="font-medium">{user?.mobile}</span>
                  </p>
                )}

                {/* Address */}
                <p className="flex items-center gap-2">
                  <span className="material-icons text-yellow-500">
                    location_on
                  </span>
                  <span className="font-medium">
                    {user?.city}, {user?.state}
                  </span>
                </p>

                {/* Country */}
                <p className="flex items-center gap-2">
                  <span className="material-icons text-red-500">public</span>
                  <span className="font-medium">{user?.country}</span>
                </p>

                {/* Full Address */}
                {user?.address && (
                  <p className="mt-4 text-gray-500 italic">"{user?.address}"</p>
                )}
              </div>
            </div>
            
            {/* Edit and Delete */}
            <div>
              <div className="flex flex-col items-center justify-center gap-4">
                <div title="Change Your Profile">
                  <EditProfile user={user} />
                </div>.
                <div title="Delete Your Profile">
                  <DeleteIcon
                    className="cursor-pointer text-red-600 "
                    sx={{
                      fontSize: "30px",
                      cursor: "pointer",
                      transition: "color 0.3s ease-in-out",
                      "&:hover": {
                        color: "#FF5722",
                      },
                      "&:active": {
                        color: "#FF3D00",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Ux Research
            </a>
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              CX Strategy
            </a>
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Project Manager
            </a>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Profile;
