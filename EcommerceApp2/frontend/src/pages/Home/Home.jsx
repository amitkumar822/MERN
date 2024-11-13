import React from "react";
import CategoryList from "../../components/CategoryProduct/CategoryList";
import BannerSlideProduct from "../../components/Banner/BannerSlideProduct";
import HorizontalCardProduct from "../../components/HorizontalCard/HorizontalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerSlideProduct />

      <HorizontalCardProduct category={"mouse"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      
      {/* Add your other components or pages here */}
    </div>
  );
};

export default Home;
