import React from "react";
import CategoryList from "../../components/CategoryProduct/CategoryList";
import BannerSlideProduct from "../../components/Banner/BannerSlideProduct";
import VerticalCard from "../../components/Card/VerticalCard/VerticalCard";
import HorizontalCardProduct from "../../components/Card/HorizontalCard/HorizontalCardProduct";
import Carousel from "../../components/Banner/Carousel";

const Home = () => {
  return (
    <div>
      <CategoryList />
      {/* <BannerSlideProduct /> */}
      <Carousel />

      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />

      <VerticalCard category={"mobiles"} heading={"Mobiles"} />
      <VerticalCard category={"mouse"} heading={"Mouse"} />
      <VerticalCard category={"televisions"} heading={"Televisions"} />
      <VerticalCard category={"camera"} heading={"Camera & Photography"} />
      <VerticalCard category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCard category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCard category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCard category={"trimmers"} heading={"Trimmers"} />

      {/* Add your other components or pages here */}
    </div>
  );
};

export default Home;
