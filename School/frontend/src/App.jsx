import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Home from "./layouts/home/Home";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Students from "./pages/dashboard/Students";
import Attendances from "./pages/dashboard/Attendances";
import Settings from "./pages/dashboard/Settings";
import Navbar from "./layouts/navbar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "attendances",
        element: <Attendances />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <RouterProvider router={router} />
      </main>
    </>
  );
};

export default App;
