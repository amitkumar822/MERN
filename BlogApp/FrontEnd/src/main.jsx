import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { CreatorsProvider } from "./contexts/CreatorsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CreatorsProvider>
        <App />
      </CreatorsProvider>
    </AuthProvider>
  </BrowserRouter>
);
