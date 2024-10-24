import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const Hero = () => {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => {
          return (
            <Link
              to={`/`}
              key={element._id}
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={element?.blogImage?.url}
                  className="w-full h-56 object-cover rounded-t-lg"
                  alt="blog"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                <h1 className="absolute bottom-4 left-4 text-white bg-[rgba(0,0,0,0.3)] px-2 -ml-4 rounded-r-md font-bold text-xl group-hover:text-yellow-400 transition-colors duration-300">
                  {element?.title}
                </h1>
              </div>
              <div className="flex p-6 items-center">
                <img src={element?.adminPhoto.url}
                className="w-12 h-12 object-cover rounded-full border-2 border-yellow-400"
                alt="" />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{element.adminName}</p>
                  <p className="text-xs text-gray-400">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Hero;
