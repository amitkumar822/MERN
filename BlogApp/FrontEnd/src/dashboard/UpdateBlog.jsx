import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const UpdateBlog = () => {
  const navigateTo = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false); // Track if image was changed

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBlogImagePreview(reader.result);
        setBlogImage(file);
        setIsImageChanged(true); // Mark that the image was changed
      };
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/get-single-blog/${id}`);
        // console.log("ResponseUpF: ", data.blog);
        setTitle(data?.blog?.title);
        setCategory(data?.blog?.category);
        setAbout(data?.blog?.about);
        setBlogImage(data?.blog?.blogImage?.url); // Store the URL
        setBlogImage(data?.blog?.blogImage?.url);
        setIsImageChanged(false); // Reset the image changed flag on load
      } catch (error) {
        console.log(
          "Single Blog Fetch Error on Update Blog section: \n",
          error
        );
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if ([title, category, about].some((field) => field.trim() === "")) {
      toast.info("All fields must be required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);

    // Only append the blogImage if it was changed
    if (isImageChanged && blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      await axios.put(`/api/blogs/update-blog/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog Update Success");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center text-red-600">
            Update <span className="text-green-500">Blog</span>
          </h1>
          <form onSubmit={handleUpdateBlog}>
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            >
              <option value="">Select Category</option>
              <option value="Devotion">Devotion</option>
              <option value="Sports">Sports</option>
              <option value="Coding">Coding</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>

            <div className="mb-4">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
            <div>
              <label className="block text-lg">Blog Image</label>
              <div className=" items-center mb-4 space-y-2">
                <div className="w-full mx-auto flex justify-center items-center">
                  <img
                    src={
                      blogImagePreview
                        ? blogImagePreview
                        : blogImage
                        ? blogImage
                        : "photo"
                    }
                    alt="photo"
                    className="max-w-56 max-h-56 overflow-hidden"
                  />
                </div>
                <input
                  type="file"
                  onChange={changePhotoHandler}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write your blog description min 200 characters"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
