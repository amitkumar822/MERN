import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-57px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
