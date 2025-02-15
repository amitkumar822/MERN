import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./stores/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </Provider>
);
