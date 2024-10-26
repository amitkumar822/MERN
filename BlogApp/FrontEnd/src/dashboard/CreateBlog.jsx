import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreaterBlogs = async (e) => {
    e.preventDefault();
    setLoading(true);

    if ([title, category, about].some((field) => field.trim() === "")) {
      toast.info("All fields must be required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      const response = await axios.post("/api/blogs/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      toast.success("Blog Create Success");
      // console.log("response: ", response.data);
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImagePreview("");
      setBlogImage("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || "Internal Server Error");
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center text-red-600">
            Create <span className="text-green-500">Blog</span>
          </h1>
          <form onSubmit={handleCreaterBlogs}>
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
                    src={blogImagePreview ? `${blogImagePreview}` : "Photo"}
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
              {loading ? <ClipLoader color="#fff" size={20} /> : "Post Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
