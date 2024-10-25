import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blogs/get-my-blog");
        console.log("MyBlogs: ", data.blog);
        setMyBlogs(data.blog);
        toast.success("My Blogs fetched successfully");
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyBlogs();
  }, []);
  
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs?.map((element, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {element.blogImage && (
                  <img
                    src={element?.blogImage?.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element?.category}
                  </span>
                  <h4 className="text-xl font-semibold py-2">
                    {element?.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to="/"
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline">
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You have not posted any blog to see!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
