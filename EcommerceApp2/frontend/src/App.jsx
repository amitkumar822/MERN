import React from "react";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Main/Header";

function App() {
  
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
