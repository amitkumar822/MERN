import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import { AmazonBanner } from "../../data/banner/BannerExport";
import scrollTop from "../../helpers/scrollTop";

const CarouselDesktop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/get4category-product", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setProduct(data?.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Banner slideshow
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideCount = AmazonBanner.length || 0; // Total number of slides

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideCount]);

  return (
    <div className="bg-gray-100">
      {/* Banner Slideshow */}
      <div
        className={`w-full xl:h-[58rem] lg:h-[46rem] bg-yellow-300 lg:block hidden`}
        style={{
          backgroundImage: `url(${AmazonBanner[currentIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Mobile Carousel */}
      <div className="lg:hidden block">
        <Carousel />
      </div>

      {/* Dekstop Carousel */}
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:-mt-[34rem] lg:-mt-[27rem] px-4 pb-2">
        {/* Column 1: Most-Loved Products */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="xl:text-lg font-bold mb-2">
          Our Most Popular cloaks
          </h2>
          <div className="grid grid-cols-2 gap-2 overflow-hidden">
            {loading ? (
              <Skeleton />
            ) : (
              product &&
              product[0]?.products?.map((items, index) => (
                <Link
                  to={"/product/" + items?._id}
                  onClick={scrollTop}
                  className="text-center cursor-pointer"
                  key={index}
                >
                  <img
                    src={items?.productImage[0].url}
                    alt="Home Decor"
                    className="rounded-lg max-h-60 overflow-hidden"
                  />
                  {/* <p className="mt-1 text-sm line-clamp-1">{items?.productName}</p> */}
                </Link>
              ))
            )}
          </div>
          <Link
            to={`category-filter?category=${product[0]?.category}`}
            className={`text-blue-500 text-sm mt-2 inline-block ${
              loading ? "hidden" : "block"
            }`}
          >
            Explore all
          </Link>
        </div>

        {/* Column 2: Revamp Your Home */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="xl:text-lg font-bold mb-2">
          Redefine Style with the Perfect T-Shirt
            {/* Discover the Perfect T-Shirt to Redefine Your Look */}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {loading ? (
              <Skeleton />
            ) : (
              product &&
              product[1]?.products?.map((items, index) => (
                <Link
                  to={"/product/" + items?._id}
                  onClick={scrollTop}
                  className="text-center cursor-pointer"
                  key={index}
                >
                  <img
                    src={items?.productImage[0].url}
                    alt="Home Decor"
                    className="rounded-lg"
                  />
                </Link>
              ))
            )}
          </div>
          <Link
            to={`category-filter?category=${product[1]?.category}`}
            className={`text-blue-500 text-sm mt-2 inline-block ${
              loading ? "hidden" : "block"
            }`}
          >
            Explore all
          </Link>
        </div>

        {/* Column 3: Small Businesses */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="xl:text-lg font-bold mb-2">
            {/* Explore more from Small Businesses */}
            Revamp your home in style
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {loading ? (
              <Skeleton />
            ) : (
              product &&
              product[2]?.products?.map((items, index) => (
                <Link
                  to={"/product/" + items?._id}
                  onClick={scrollTop}
                  className="text-center cursor-pointer"
                  key={index}
                >
                  <div className="text-center">
                    <img
                      src={items?.productImage[0].url}
                      alt={items?.brand}
                      className="rounded-lg max-h-44"
                    />
                  </div>
                  <p className="mt-1 text-sm line-clamp-1">
                    {items?.productName}
                  </p>
                </Link>
              ))
            )}
          </div>
          <Link
            to={`category-filter?category=${product[2]?.category}`}
            className={`text-blue-500 text-sm mt-2 inline-block ${
              loading ? "hidden" : "block"
            }`}
          >
            Explore all
          </Link>
        </div>

        {/* Column 4: Sign In */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="xl:text-lg font-bold mb-2">
            {/* Explore more from Small Businesses */}
            Traditional & Modern Sarees
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {loading ? (
              <Skeleton />
            ) : (
              product &&
              product[3]?.products?.map((items, index) => (
                <Link
                  to={"/product/" + items?._id}
                  onClick={scrollTop}
                  className="text-center cursor-pointer"
                  key={index}
                >
                  <div className="text-center">
                    <img
                      src={items?.productImage[0].url}
                      alt={items?.brand}
                      className="rounded-lg max-h-48"
                    />
                  </div>
                  <p className="mt-1 text-sm line-clamp-1">
                    {items?.productName}
                  </p>
                </Link>
              ))
            )}
          </div>
          <Link
            aria-disabled
            to={`category-filter?category=${product[3]?.category}`}
            className={`text-blue-500 text-sm mt-2 inline-block ${
              loading ? "hidden" : "block"
            }`}
          >
            Explore all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselDesktop;

const Skeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <div className="bg-gray-200 w-40 h-40 flex justify-center items-center skeleton"></div>
          <p className="mt-1 bg-gray-200 w-[95%] h-4 skeleton"></p>
        </div>
      ))}
    </>
  );
};
