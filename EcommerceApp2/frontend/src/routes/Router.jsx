import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import NotFound404 from "../components/NotFound404";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct/CategoryProduct";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ViewCart from "../pages/Cart/ViewCart";
import SearchProduct from "../pages/SearchProductPage/SearchProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/product-category" element={<CategoryProduct />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/view-cart" element={<ViewCart />} />
      <Route path="/search" element={<SearchProduct />} />

      {/* Admin Panel Routes */}
      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route path="all-users" element={<AllUsers />} />
        <Route path="all-products" element={<AllProducts />} />
      </Route>
      <Route path="/*" element={<NotFound404 />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export { router };
