import React from "react";
import Navigation from "./customer/components/navigation/Navigation";
import HomePage from "./customer/pages/HomePage/HomePage";
import Footer from "./customer/components/Footer/Footer";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import Cart from "./customer/components/Cart/Cart"; 
import CheckOut from "./customer/components/CheckOut/CheckOut"; 
import Order from "./customer/components/Order/Order";

function App() {
  return (
    <>
      <div>
        <Navigation />
        <div>
          {/* <HomePage /> */}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Cart /> */}
          {/* <CheckOut /> */}
          <Order />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
