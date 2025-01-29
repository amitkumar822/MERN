import React from "react";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import Portfolio from "./pages/Portfolio";
import { Outlet } from "react-router";
import Footer from "./pages/Footer";
import ScrollToTop from "./helpers/scrollTop";

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
};

export default App;
