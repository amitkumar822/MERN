import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import UserContext from "./context/userContext";

function App() {
  const { cartProductCount, fetchCountAddToCart } = useContext(UserContext);
  console.log('====================================');
  console.log(cartProductCount);
  console.log('====================================');

  useEffect(() => {
    fetchCountAddToCart();
  }, []);
  return (
    <div>
      <>
        <Header />
        <main className="min-h-[calc(100vh-57px)] pt-16 px-4">
          <Outlet />
        </main>
        <Footer />
      </>
      <ToastContainer position={"top-center"} theme="colored" />
    </div>
  );
}

export default App;
