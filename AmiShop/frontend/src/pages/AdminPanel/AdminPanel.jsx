import React from "react";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { ROLE } from "../../common/Role";
import Login from "../Auth/Login";
import LogOut from "../Auth/LogOut"

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const token = localStorage.getItem("token");

  if (!token && user?.role !== ROLE.ADMIN) {
    return <Login />;
  }

  return (
    <>
      {user?.role === ROLE.ADMIN ? (
        <div className="min-h-[calc(100vh-70px)] md:flex hidden">
          <aside className="bg-white min-h-full  w-full pt-5  max-w-60 shadow-[8px_0_15px_rgba(0,0,0,0.2)]">
            <div className="h-32  flex justify-center items-center flex-col">
              <div className="text-5xl cursor-pointer relative flex justify-center">
                {user?.avatar ? (
                  <img
                    src={user?.avatar?.url}
                    className="w-20 h-20 rounded-full border"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser className="w-20 h-20 rounded-full" />
                )}
              </div>
              <p className="capitalize text-lg font-semibold">{user?.name}</p>
              <p className="text-sm">{user?.role}</p>
            </div>

            {/***navigation */}
            <div>
              <nav className="grid p-4 text-center text-[18px] text-white">
                <Link
                  to={""}
                  className="w-full px-4 py-2 my-1 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  All Users
                </Link>
                <Link
                  to={"all-products"}
                  className="w-full px-4 py-2 my-1 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300"
                >
                  All product
                </Link>
                <Link
                  to={"all-order"}
                  className="w-full px-4 py-2 my-1 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  All Order
                </Link>
                {user?.name && (
                  <button className="w-full px-4 py-2 my-1 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300">
                    <LogOut />
                  </button>
                )}
              </nav>
            </div>
          </aside>

          <main className="w-full h-full px-2">
            <Outlet />
          </main>
        </div>
      ) : (
        // <Login />
        <div className="min-h-[calc(100vh-70px)] flex justify-center items-center"><h2>Loading...</h2></div>
      )}
    </>
  );
};

export default AdminPanel;
