import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthProvider";
import Creators from "./pages/Creators";

function App() {
  const location = useLocation();
  const { blogs } = useAuth();

  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );

  // console.log("blog: ",  blog)

  return (
    <>
      <div className="">
        {!hideNavbarFooter && <Navbar />}
        <div className="md:px-10">
          {/* Difining router */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          {/* {!hideNavbarFooter && <Footer />} */}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
