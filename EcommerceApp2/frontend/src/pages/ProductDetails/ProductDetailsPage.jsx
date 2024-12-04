import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";
import displayINRCurrency from "../../helpers/displayINRCurrency";
import CategroyWiseProductDisplay from "../../components/CategoryProduct/CategroyWiseProductDisplay";
import AddToCart from "../../helpers/AddToCart";
import UserContext from "../../context/userContext";
import ReviewPage from "../../components/Review/ReviewPage";

const ProductDetailsPage = () => {
  const { userReview } = useContext(UserContext);
  
  const { fetchCountAddToCart } = useContext(UserContext);
  const productId = useParams();
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/product/getproduct-details/${productId?.id}`,
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);
      setData(data?.data);
      setActiveImage(data?.data?.productImage[0]?.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchCountAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await AddToCart(e, id);
    navigate("/view-cart");
  };

  return (
    <div>
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
            {/* product image section */}
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              {/* Product Image */}
              <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] flex justify-center items-center relative">
                <div>
                  <img
                    src={activeImage}
                    className="h-[300px] w-[300px] lg:h-96 lg:w-96 object-scale-down mix-blend-multiply cursor-pointer"
                    onMouseMove={handleZoomImage}
                    onMouseLeave={handleLeaveImageZoom}
                  />

                  {/**product zoom */}
                  {zoomImage && (
                    <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[460px] bg-slate-200 p-1 -right-[510px] top-0">
                      <div
                        className="w-full h-full min-h-[460px] min-w-[500px] mix-blend-multiply"
                        style={{
                          background: `url(${activeImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${
                            zoomImageCoordinate.x * 100
                          }% ${zoomImageCoordinate.y * 100}% `,
                        }}
                      >
                      </div>
                    </div>
                  )}
                </div>
                {/* Heart rate or dil */}
                <button type="button" className="absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    fill="#ccc"
                    className="mr-1 hover:fill-[#333]"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Product multiple images */}
              <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                {data?.productImage?.map((imgURL, index) => (
                  <div
                    key={index}
                    className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer"
                  >
                    <img
                      src={imgURL?.url}
                      alt="Product2"
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL?.url)}
                      onClick={() => handleMouseEnterProduct(imgURL?.url)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit capitalize">
                {data?.brand}
              </p>
              <h2 className="text-2xl capitalize font-extrabold text-gray-800">
                {data?.productName}
              </h2>

              <div className="flex space-x-2 mt-4">
                <div className={`${zoomImage ? "hidden" : "block"}`}>
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
                      sx={{
                        zIndex: 0,
                      }}
                    />
                  </Stack>
                </div>

                <h4 className="text-gray-800 text-base">
                  {userReview?.stats?.totalUsers} Reviews
                </h4>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <p className="text-gray-800 text-3xl font-bold">
                  {displayINRCurrency(data.sellingPrice)}
                </p>
                <p className="text-red-600 text-base">
                  <strike>{displayINRCurrency(data?.price)}</strike>{" "}
                  <span className="text-sm ml-1">Tax included</span>
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">
                  Choose a Color
                </h3>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    type="button"
                    className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-gray-300 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-gray-100 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                  <button
                    type="button"
                    className="w-10 h-10 bg-blue-400 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                  ></button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                  type="button"
                  className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
                >
                  Buy now
                </button>
                <button
                  onClick={(e) => handleAddToCart(e, data?._id)}
                  type="button"
                  className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product information */}
          <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Product Description :
            </h3>
            <p>{data?.description}</p>
            <br />

            {/* Category by hidde information */}
            <div
              className={`${
                data?.category === "mobiles" || data?.category === "televisions"
                  ? ""
                  : "hidden"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-800">
                Product information
              </h3>
              <ul className="mt-4 space-y-6 text-gray-800">
                <li className="text-sm">
                  TYPE <span className="ml-4 float-right">LAPTOP</span>
                </li>
                <li className="text-sm">
                  RAM <span className="ml-4 float-right">16 BG</span>
                </li>
                <li className="text-sm">
                  SSD <span className="ml-4 float-right">1000 BG</span>
                </li>
                <li className="text-sm">
                  PROCESSOR TYPE{" "}
                  <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
                </li>
                <li className="text-sm">
                  PROCESSOR SPEED{" "}
                  <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
                </li>
                <li className="text-sm">
                  DISPLAY SIZE INCH{" "}
                  <span className="ml-4 float-right">16.0</span>
                </li>
                <li className="text-sm">
                  DISPLAY SIZE SM{" "}
                  <span className="ml-4 float-right">40.64 cm</span>
                </li>
                <li className="text-sm">
                  DISPLAY TYPE{" "}
                  <span className="ml-4 float-right">
                    OLED, TOUCHSCREEN, 120 Hz
                  </span>
                </li>
                <li className="text-sm">
                  DISPLAY RESOLUTION{" "}
                  <span className="ml-4 float-right">2880x1620</span>
                </li>
              </ul>
            </div>
          </div>

          {/******👇 Reive Page 👇*********/}
          <div className="mt-4">
            <ReviewPage />
          </div>

          {data.category && (
            <CategroyWiseProductDisplay
              category={data?.category}
              heading={"Recommended Product"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
