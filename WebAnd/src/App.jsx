import React from "react";
import Navbar from "./pages/Navbar";
import { Outlet } from "react-router";
import Footer from "./pages/Footer";
import ScrollToTop from "./helpers/scrollTop";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <ScrollToTop />

      <ToastContainer />
    </div>
  );
};

export default App;
