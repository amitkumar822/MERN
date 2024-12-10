import axios from "axios";
import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [images, setImages] = useState([]);

  const fetchAllBanner = async () => {
    try {
      const { data } = await axios.get("/api/banner-slider/get-banner");
      setImages(data?.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    fetchAllBanner();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideCount = images.length || 0; // Total number of slides

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideCount]);

  // Smoothly scroll to the top of the carousel when a button is clicked
  const handleButtonClick = (index) => {
    setCurrentIndex(index);
    document.getElementById("carousel").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="carousel" className="w-full w-full mx-auto relative">
      <div>
        {/* Carousel */}
        <div className="carousel w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((items, index) => {
              return (
                <div className="carousel-item w-full flex-shrink-0" key={index}>
                  <img
                    src={items?.bannerImg?.url}
                    className="w-full"
                    alt={"Banner " + index}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex w-full justify-center absolute bottom-0">
          <div className="flex gap-2 p-2 pb-4 rounded-lg">
            {[...Array(slideCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={`w-4 h-2 rounded-full bg-gray-200 ${
                  currentIndex === index ? "btn-active bg-gray-400 w-3" : ""
                }`}
                aria-label={`Slide ${index + 1}`} // For accessibility
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
