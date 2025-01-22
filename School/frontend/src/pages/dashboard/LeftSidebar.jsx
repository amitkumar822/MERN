import React from "react";
import {
  GraduationCap,
  Hand,
  LayoutIcon,
  Settings,
  Sheet,
} from "lucide-react";
import { Link } from "react-router";

const LeftSidebar = () => {
  return (
    <div className="w-72 h-screen border shadow-md shadow-gray-500">
      <div className="flex flex-col gap-2 p-4">
        {menuList.map((menu) => (
          <Link
            to={menu.path}
            key={menu.id}
            className="flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2"
          >
            <menu.icons />
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;

const menuList = [
  {
    id: 1,
    name: "Dashboard",
    icons: Sheet,
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Student",
    icons: GraduationCap,
    path: "/dashboard/students",
  },
  {
    id: 3,
    name: "Attendance",
    icons: Hand,
    path: "/dashboard/attendances",
  },
  {
    id: 4,
    name: "Settings",
    icons: Settings,
    path: "/dashboard/settings",
  },
];
