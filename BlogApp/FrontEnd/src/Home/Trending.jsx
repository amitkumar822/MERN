import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Trending = () => {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.map((element) => {
            return (
              <Link
                to={`/`}
                key={element._id}
                className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="group relative">
                  <img
                    src={element?.blogImage?.url}
                    className="w-full h-56 object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                  <h1 className="absolute bottom-4 left-4 text-white bg-[rgba(0,0,0,0.3)] px-2 -ml-4 rounded-r-md font-bold text-xl group-hover:text-yellow-400 transition-colors duration-300">
                    {element?.title}
                  </h1>
                </div>
                <div className="flex p-6 items-center">
                  <img
                    src={element?.adminPhoto.url}
                    className="w-12 h-12 object-cover rounded-full border-2 border-yellow-400"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {element.adminName}
                    </p>
                    <p className="text-xs text-gray-400">New</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div></div>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
