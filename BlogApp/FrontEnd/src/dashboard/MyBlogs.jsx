import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState();
  const [blogId, setBlogId] = useState("");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blogs/get-my-blog");
        setMyBlogs(data.blog);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`/api/blogs/delete/${blogId}`);
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Faild to delete blog")
    }
  }

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
                      to={`/blog/update/${element?._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => setBlogId(element?._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}

          {/* Delete Confirmation Modal */}
          <div>
            {blogId && (
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                <div className="bg-white rounded-lg p-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
                  <h1 className="text-lg md:text-2xl text-gray-800 font-semibold text-center mb-4">
                    Are you sure you want to delete the profile?
                  </h1>
                  <div className="flex justify-around mt-4">
                    <button
                      onClick={() => setBlogId("")}
                      className="bg-green-600 hover:bg-green-700 duration-300 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteProfile}
                      className="bg-red-600 hover:bg-red-700 duration-300 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
