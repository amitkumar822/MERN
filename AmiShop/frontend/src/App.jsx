import React, { useEffect } from "react";
import Footer from "./components/Main/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Main/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <ErrorBoundary>
      <>
        <Header />
        <main className="min-h-[calc(100vh-57px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </>
      <ToastContainer
        position={"top-center"}
        theme="colored"
        autoClose="2000"
      />
    </ErrorBoundary>
  );
}

export default App;
