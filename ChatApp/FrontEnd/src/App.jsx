import React from "react";
import LeftPart from "./components/LeftPart/LeftPart";
import RightPart from "./components/RightPart/RightPart";
import Signup from "./components/LoginAndSignup/Signup";
import Login from "./components/LoginAndSignup/Login";
import { useAuth } from "./context/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              // <div className="flex h-screen">
              //   <LeftPart />
              //   <RightPart />
              // </div>
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center justify-center">
                <RightPart />
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-black text-base-content min-h-full w-80">
                  <LeftPart />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
