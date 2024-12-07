import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const BannerSlideProduct = () => {
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

  // Map images to carousel items
  const carouselItems = images.map((items, index) => (
    <div key={index} className="h-[300px] overflow-hidden">
      <img
        src={items?.bannerImg?.url}
        alt={`Banner ${index + 1}`}
        className="w-full h-full object-cover"
        // onClick={() => alert(`Category: ${items.category}`)}
      />
    </div>
  ));

  return (
    <div className="container mx-auto mt-2">
      {carouselItems.length > 0 ? (
        <AliceCarousel
          items={carouselItems}
          disableButtonsControls
          autoPlay
          autoPlayInterval={1500}
          infinite          
          responsive={{
            0: { items: 1 }, // 1 item on small screens
            768: { items: 1 }, // 1 item on tablets
            1024: { items: 1 }, // 1 item on desktops
          }}
        />
      ) : (
        <p>Loading banners...</p>
      )}
    </div>
  );
};

export default BannerSlideProduct;
