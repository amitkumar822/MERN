import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import WriteReview from "./WriteReview";
import axios from "axios";
import { useParams } from "react-router";
import { formatDateToDDMMYYYY } from "../../helpers/FormatDateToDDMMYYYY";
import { useSelector } from "react-redux";
import UserContext from "../../context/userContext";

const ReviewPage = () => {
  const user = useSelector((state) => state?.user?.user);

  const { userReview, setUserReview } = useContext(UserContext);

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
      setAllReviews(data?.data?.reviews);
      setUserReview(data?.data);
    } catch (error) {
      console.log("Error Fetach Review: \n", error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [productId]);

  // ==========�� Post Likes and Dislikes ��======
  const handleLike = async (reviewId) => {
    try {
      await axios.post(`/api/review/likes/${reviewId}`);
      fetchReview();
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const handleDisLike = async (reviewId) => {
    try {
      await axios.post(`/api/review/dislikes/${reviewId}`);
      fetchReview();
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const [showHideWriteReview, setShowHideWriteReview] = useState(false);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-end -mb-10">
        <button
          onClick={() => setShowHideWriteReview(!showHideWriteReview)}
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <span className="flex items-center gap-2">
            <FaStar className="text-yellow-300" /> Rate Product
          </span>
        </button>
      </div>

      {/* 👇 Write Review Page Import 👇 */}
      <div className={`${showHideWriteReview ? "block" : "hidden"}`}>
        <WriteReview productId={productId} fetchReview={fetchReview} />
      </div>

      {/* Analytics */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Rating Analytics
        </h3>
        <div className="space-y-4">
          {ratingAnalytics.map((count, i) => {
            // Colors for each rating level
            const colors = [
              "text-red-500",
              "text-orange-500",
              "text-yellow-500",
              "text-green-500",
              "text-blue-500",
            ];
            const gradients = [
              "from-red-400 to-red-600",
              "from-orange-400 to-orange-600",
              "from-yellow-400 to-yellow-600",
              "from-green-400 to-green-600",
              "from-blue-400 to-blue-600",
            ];

            // Calculate percentage
            const percentage = (count / allReviews.length) * 100 || 0;

            return (
              <div
                key={i}
                className="flex items-center gap-6 p-2 bg-gray-50 rounded-lg shadow-sm"
              >
                {/* Star Rating */}
                <div
                  className={`flex items-center gap-1 text-lg font-semibold ${colors[i]}`}
                >
                  <FaStar />
                  <span>{i + 1}</span>
                </div>
                {/* Progress Bar */}
                <div className="flex-1">
                  <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                    <div
                      className={`h-4 bg-gradient-to-r ${gradients[i]}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
                {/* Review Count */}
                <span className="text-gray-600 text-sm">
                  {count} {count === 1 ? "review" : "reviews"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/*User Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          User Reviews ({allReviews.length})
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
                    src={review?.photo?.url}
                    alt="Review"
                    className="h-32 w-auto rounded-lg"
                  />
                )}
                <div className="flex gap-4 text-gray-600 mt-2">
                  <button
                    className={` ${
                      review?.likes?.includes(user?._id)
                        ? "text-blue-500"
                        : "hover:text-blue-500"
                    }  flex items-center gap-1 hover:text-blue-500`}
                    onClick={() => handleLike(review?._id)}
                  >
                    <FaThumbsUp />
                    {review?.likes?.length}
                  </button>
                  <button
                    className={`flex items-center gap-1 ${
                      review?.dislikes?.includes(user?._id)
                        ? "text-red-500"
                        : "hover:text-red-500"
                    }`}
                    onClick={() => handleDisLike(review?._id)}
                  >
                    <FaThumbsDown />
                    {review?.dislikes?.length}
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
