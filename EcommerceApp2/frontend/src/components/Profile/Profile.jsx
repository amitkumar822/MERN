import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import DeleteIcon from "@mui/icons-material/Delete";

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);

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
          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
                {user?.name}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
                Email:- {user?.email}
                <br className="hidden sm:block" />
                New York, United States
              </p>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center gap-4">
                <div title="Change Your Profile">
                  <EditProfile user={user} />
                </div>
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
          <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
