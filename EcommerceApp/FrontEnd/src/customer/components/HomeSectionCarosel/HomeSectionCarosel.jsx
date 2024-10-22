import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@mui/material/Button";

function HomeSectionCarosel({data, sectionName}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null); // Create a reference for the carousel

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const slidePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      carouselRef.current.slidePrev(); // Move the carousel
    }
  };

  const slideNext = () => {
    if (activeIndex < data.length - 1) {
      setActiveIndex(activeIndex + 1);
      carouselRef.current.slideNext(); // Move the carousel
    }
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.map((item) => <HomeSectionCard products={item} />);

  return (
    <div className="-mt-16"> 
    {/*👆relative px-4 lg:px-8 */}
    <h2 className="text-2xl font-extrabold text-gray-800">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          ref={carouselRef} // Attach the ref to the carousel
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex} // Keep this for sync but control with slideTo
        />
        {/* right Button */}
        {activeIndex !== items.length - 5 && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}

        {/* left Button */}
        {activeIndex !== 0 && <Button
          onClick={slidePrev}
          variant="contained"
          className="z-50 bg-white"
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(-90deg)",
            bgcolor: "white",
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>}
      </div>
    </div>
  );
}

export default HomeSectionCarosel;
