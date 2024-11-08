import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-57px)] pt-16">
        <Outlet />
      </main>
      <Footer />

      <ToastContainer position={"top-center"} />
    </div>
  );
}

export default App;
