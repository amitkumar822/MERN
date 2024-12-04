import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";

const WriteReview = ({ productId, fetchReview }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [showPhoto, setShowPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    toast.info("Please Wait...");
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("review", comment);
    formData.append("rating", rating);

    try {
      await axios.post(`/api/review/write-reviews/${productId}`, formData, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success(`Review added successfully`);

      setRating(0);
      setComment("");
      setShowPhoto(null);
      setPhoto(null);

      fetchReview();
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Failed to add review");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Write a Review
      </h2>

      {/* Rating */}
      <div className="mb-4 flex items-center">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            className={`text-3xl ${
              (hover || rating) > i ? "text-yellow-500" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(i + 1)}
          >
            <FaStar />
          </button>
        ))}
      </div>

      {/* Comment Input */}
      <textarea
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-4"
        rows="4"
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      {/* Photo Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload a photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setShowPhoto(URL.createObjectURL(e.target.files[0])),
              setPhoto(e.target.files[0]);
          }}
        />
        {showPhoto && (
          <img
            src={showPhoto}
            alt="Preview"
            className="mt-4 h-32 rounded-md shadow"
          />
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
        {loading ? (
          <SyncLoader color="#fff" size={14} loading={loading} />
        ) : (
          <div
            onClick={handleSubmit}
            className="cursor-pointer w-full text-center"
          >
            Submit Review
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteReview;
