import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const WriteReview = ({ productId, fetchReview }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);

  console.log("rating: " + rating);

  const handleSubmit = async () => {
    toast.info("Please Wait...")
    const data = {
      rating,
      review: comment,
    };

    try {
      const response = await axios.post(
        `/api/review/write-reviews/${productId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`Review added successfully`);
      console.log(response.data?.data);
      setRating(0);
      setComment("");
      setPhoto(null);

      // Fetch updated user data to display the new review
      fetchReview();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add review");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Leave a Review
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
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
        />
        {photo && (
          <img
            src={photo}
            alt="Preview"
            className="mt-4 h-32 rounded-md shadow"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
};

export default WriteReview;
