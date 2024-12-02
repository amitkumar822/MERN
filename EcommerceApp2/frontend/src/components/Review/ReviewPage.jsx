import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import WriteReview from "./WriteReview";
import axios from "axios";
import { useParams } from "react-router";
import { formatDateToDDMMYYYY } from "../../helpers/FormatDateToDDMMYYYY";

const ReviewPage = () => {
  const { id: productId } = useParams();

  const [allReviews, setAllReviews] = useState([]);

  // Analytics (calculate dynamically)
  const ratingAnalytics = Array(5)
    .fill(0)
    .map(
      (_, i) => allReviews.filter((review) => review.rating === i + 1).length
    );

  // ==========👇 Get Review 👇======
  const fetchReview = async () => {
    try {
      const { data } = await axios.get(`/api/review/get-review/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setAllReviews(data?.data);
    } catch (error) {
      console.log("Error Fetach Review: \n", error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 👇 Write Review Page Import 👇 */}
      <WriteReview />

      {/* Analytics */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Rating Analytics
        </h3>
        {ratingAnalytics.map((count, i) => (
          <div key={i} className="flex items-center gap-4 mb-2">
            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <span>{i + 1}</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${(count / allReviews.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="text-gray-600 text-sm">{count} reviews</span>
          </div>
        ))}
      </div>

      {/*User Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          User Reviews
        </h3>
        {allReviews.length > 0 ? (
          allReviews.map((review) => (
            <div
              key={review._id}
              className="p-4 bg-gray-100 rounded-lg shadow mb-4 flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
                  <img
                    src={review?.userId?.avatar?.url}
                    alt="User"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold">
                    {review?.userId?.name}
                  </h4>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <BiTime />
                    {formatDateToDDMMYYYY(review.createdAt)}
                  </span>
                </div>

                {/* Rating Part */}
                <div className="flex items-center gap-1 mb-2 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-gray-300" />
                  ))}
                </div>

                {/* Comment or Review Part */}
                <p className="text-gray-700 mb-2">{review?.review}</p>

                {/* Photo Part */}
                {review.photo && (
                  <img
                    src={review.photo}
                    alt="Review"
                    className="h-32 w-auto rounded-lg"
                  />
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
                          r.id === review.id
                            ? { ...r, dislikes: r.dislikes + 1 }
                            : r
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
          <p className="text-gray-600">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
