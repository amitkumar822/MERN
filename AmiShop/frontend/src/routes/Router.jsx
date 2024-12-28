import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import NotFound404 from "../components/NotFound404";
import AllUsers from "../pages/AdminPanel/AllUsers";
import AllProducts from "../pages/AdminPanel/AllProducts";
import Home from "../pages/Home/Home";
import SearchProduct from "../pages/SearchProductPage/SearchProduct";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import OrderViewCart from "../pages/Cart/OrderViewCart";
import Profile from "../components/Profile/Profile";
import Success from "../pages/Cart/Success";
import Failed from "../pages/Cart/Failed";
import OrderCard from "../components/Order/OrderCard";
import AllOrder from "../pages/AdminPanel/AllOrder";
import CategoryFilterPage from "../pages/CategoryProduct/CategoryFilterPage";
import AllBestSellingProduct from "../components/Main/BestSellingProduct/AllBestSellingProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/category-filter" element={<CategoryFilterPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/view-cart" element={<OrderViewCart />} />
      <Route path="/search" element={<SearchProduct />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="/order" element={<OrderCard />} />
      <Route path="/best-selling-product" element={<AllBestSellingProduct />} />

      {/* Admin Panel Routes */}
      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route path="" element={<AllUsers />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="all-order" element={<AllOrder />} />
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
