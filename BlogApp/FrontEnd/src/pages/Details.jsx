import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/get-single-blog/${id}`);

        setBlogs(data.blog);
        console.log("singleBlog: ", data.blog);
        // setTitle(data?.blog?.title);
        // setCategory(data?.blog?.category);
        // setAbout(data?.blog?.about);
        // setBlogImage(data?.blog?.blogImage?.url); // Store the URL
        // setBlogImage(data?.blog?.blogImage?.url);
        // setIsImageChanged(false); // Reset the image changed flag on load
      } catch (error) {
        console.log("Details Single FetchError: \n", error.message);
      }
    };
    fetchBlog();
  }, [id]);
  return (
    // <div>Detials</div>
    <div>
      {blogs && (
        <section className="container mx-auto p-4">
          <div className="text-blue-500 uppercase text-xs font-bold mb-4">
            {blogs?.category}
          </div>
          <h1 className="text-4xl font-bold mb-6">{blogs?.titile}</h1>
          <div className="flex items-center mb-6">
            <img
              src={blogs?.adminPhoto?.url}
              alt="avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-semibold">{blogs?.adminName}</p>
          </div>
          <div className="flex flex-col md:flex-row">
            {blogs?.blogImage?.url && (
              <img
                src={blogs?.blogImage?.url}
                alt="blog2"
                className="md:w-1/2 w-full h-auto mb-6 rounded-lg shadow-lg cursor-pointer border"
              />
            )}
            <div className="md:w-1/2 w-full md:pl-6">
              <p className="text-lg mb-6">{blogs?.about}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Details;
