import React, { useContext, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const fetchCountAddToCart = async () => {
    try {
      const { data } = await axios.get("/api/user/getaddtocart", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      
    } catch (error) {
      console.log(error?.response?.data?.messsage || error);
    }
  };

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
