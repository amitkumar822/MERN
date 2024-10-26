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
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element, index) => {
            return (
              <div
                key={index}
                className="m-2 px-4 py-4 rounded-lg border border-gray-400 overflow-hidden"
              >
                <Link to={`/blog/${element?._id}`}>
                  <div className=" relative">
                    <div className="bg-orange-500 w-54 h-48 rounded-t-lg overflow-hidden">
                      <img
                        src={element?.blogImage?.url}
                        className="w-full h-full"
                        alt="blog"
                      />
                    </div>
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {element.category}
                    </div>
                    <h1
                      className="font-bold mb-2 mt-4 overflow-hidden text-ellipsis"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {element?.title}
                    </h1>
                  </div>
                  <div className="flex items-center mt-4">
                    <img
                      src={element?.adminPhoto.url}
                      className="w-8 h-8 object-cover rounded-full border-2 border-yellow-400"
                      alt="author_avatar"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-gray-500">
                        {element.adminName}
                      </p>
                      {/* <p className="text-xs text-gray-400">New</p> */}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="flex h-screen items-center justify-center">
            Loading...
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
