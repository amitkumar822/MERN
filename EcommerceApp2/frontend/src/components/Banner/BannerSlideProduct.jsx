import React, { useState, useEffect } from "react";
import axios from "axios";

const BannerSlideProduct = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);

  // Update slide automatically every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images?.length);
    }, 3000); // Adjust time for auto-slide

    return () => clearInterval(slideInterval); // Clear interval on component unmount
  }, [images.length]);

  // Handler for manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const fetchAllBanner = async () => {
    try {
      const { data } = await axios.get("/api/banner-slider/get-banner");
      console.log(data?.data);
      setImages(data?.data); // Update state with fetched data
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllBanner()
  }, [])

  console.log(images)

  return (
    <div className="carousel w-full relative overflow-hidden skeleton min-h-24">
      {images?.map((image, index) => (
        <div
          key={index}
          className={`carousel-item w-full transition-all duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <img src={image?.bannerImg?.url} className="w-full" alt={`Slide ${index + 1}`} />
        </div>
      ))}

      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button
          onClick={() =>
            goToSlide((currentSlide - 1 + images.length) % images.length)
          }
          className="btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % images.length)}
          className="btn btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default BannerSlideProduct;
