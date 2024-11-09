import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
