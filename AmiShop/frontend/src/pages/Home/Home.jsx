import React from "react";
import CategoryList from "../../components/CategoryProduct/CategoryList";
import VerticalCard from "../../components/Card/VerticalCard/VerticalCard";
import HorizontalCardProduct from "../../components/Card/HorizontalCard/HorizontalCardProduct";
import Carousel from "../../components/Banner/Carousel";
import TimeCountDown from "../../components/Main/TimeCountDown";
import Cart from "../Cart/Cart";
import PopularProduct from "../../components/Main/PopularProduct/PopularProduct";
import TopBrand from "../../components/Main/TopBrand/TopBrand";
import BestSellingProduct from "../../components/Main/BestSellingProduct/BestSellingProduct";
import CarouselDesktop from "../../components/Banner/CarouselDesktop";

const Home = () => {
  return (
    <>
      <CategoryList />

      {/* Carousel or Banner Component Desktop and mobile */}
      <CarouselDesktop />

      {/* Best Selling Product */}
      <BestSellingProduct />

      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
      />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />

      {/* Time Count Down */}
      <TimeCountDown />

      {/* Popular Product */}
      <PopularProduct />

      {/* Vertical Card */}
      <VerticalCard category={"laptops"} heading={"Best Laptops"} />

      {/* Top Brand */}
      <TopBrand />

      <VerticalCard category={"mouse"} heading={"Top Mouse"} />

      {/* Add your other components or pages here */}
      <Cart category={"mobiles"} heading={"Mobiles"} />
      <Cart category={"trimmers"} heading={"Trimmers"} />
      {/* <Review /> */}
    </>
  );
};

export default Home;
