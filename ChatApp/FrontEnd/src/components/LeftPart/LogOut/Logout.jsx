import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookie from "js-cookie";
import { toast } from "react-toastify";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookie.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error in logout" + error);
      toast.error("Error in logout", error.message);
    }
  };

  return (
    <div className="h-[10vh] bg-slate-700">
      <BiLogOutCircle
        onClick={handleLogOut}
        className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-2"
      />
    </div>
  );
}

export default Logout;
