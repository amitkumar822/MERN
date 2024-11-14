import React from "react";
import CategoryList from "../../components/CategoryProduct/CategoryList";
import BannerSlideProduct from "../../components/Banner/BannerSlideProduct";
import VerticalCard from "../../components/Card/VerticalCard/VerticalCard";
import HorizontalCardProduct from "../../components/Card/HorizontalCard/HorizontalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerSlideProduct />

      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>

      
      {/* <VerticalCard category={"mouse"} heading={"Top's Airpodes"} />
      <VerticalCard category={"watches"} heading={"Popular's Watches"}/> */}

      
      {/* Add your other components or pages here */}
    </div>
  );
};

export default Home;
