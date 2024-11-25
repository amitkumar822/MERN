import React, { useState } from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { BiTime } from "react-icons/bi";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);

  // Analytics (calculate dynamically)
  const ratingAnalytics = Array(5)
    .fill(0)
    .map((_, i) => reviews.filter((review) => review.rating === i + 1).length);

  const handleSubmit = () => {
    if (!rating || !comment) return alert("Please provide a rating and a comment!");
    setReviews([
      ...reviews,
      {
        id: reviews.length + 1,
        name: "John Doe", // Replace with user data in real applications
        rating,
        comment,
        photo,
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
      },
    ]);
    setRating(0);
    setComment("");
    setPhoto(null);
  };

  const formatTimeAgo = (timestamp) => {
    const secondsAgo = Math.floor((new Date() - timestamp) / 1000);
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leave a Review</h2>

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
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload a photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
        />
        {photo && <img src={photo} alt="Preview" className="mt-4 h-32 rounded-md shadow" />}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
      >
        Submit Review
      </button>

      {/* Analytics */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Rating Analytics</h3>
        {ratingAnalytics.map((count, i) => (
          <div key={i} className="flex items-center gap-4 mb-2">
            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <span>{i + 1}</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${(count / reviews.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="text-gray-600 text-sm">{count} reviews</span>
          </div>
        ))}
      </div>

      {/* Reviews */}
      {/* <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">User Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 bg-gray-100 rounded-lg shadow mb-4 flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                  {review.name[0]}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">{review.name}</h4>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <BiTime />
                    {formatTimeAgo(review.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-gray-300" />
                  ))}
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                {review.photo && (
                  <img src={review.photo} alt="Review" className="h-32 w-auto rounded-lg" />
                )}
                <div className="flex gap-4 text-gray-600 mt-2">
                  <button
                    className="flex items-center gap-1 hover:text-blue-500"
                    onClick={() =>
                      setReviews(
                        reviews.map((r) =>
                          r.id === review.id ? { ...r, likes: r.likes + 1 } : r
                        )
                      )
                    }
                  >
                    <FaThumbsUp />
                    {review.likes}
                  </button>
                  <button
                    className="flex items-center gap-1 hover:text-red-500"
                    onClick={() =>
                      setReviews(
                        reviews.map((r) =>
                          r.id === review.id ? { ...r, dislikes: r.dislikes + 1 } : r
                        )
                      )
                    }
                  >
                    <FaThumbsDown />
                    {review.dislikes}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div> */}
    </div>
  );
};

export default ReviewPage;
