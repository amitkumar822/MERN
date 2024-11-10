import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import UpdateUserDetails from "../components/UpdateUserDetails";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/user/get-all-users", {
        credentials: "include",
      });
      setAllUser(data?.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Internal Server Error");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-y-auto md:flex hidden pt-1">
      <div className="w-full max-h-full overflow-y-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-gray-800 to-gray-600 text-white text-left">
              <th className="py-3 px-4">Sr.</th>
              <th className="py-3 px-4">Avatar</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((details, index) => (
              <tr
                key={index}
                className="border-b last:border-none transition-colors duration-200 hover:bg-gray-100"
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">
                  <img
                    src={details?.avatar?.url}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border text-sm"
                  />
                </td>
                <td className="py-4 px-4">{details?.name}</td>
                <td className="py-4 px-4">{details?.email}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                      details?.role === "ADMIN"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {details?.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {moment(details?.createdAt).format("LL")}
                </td>
                <td className="py-4 px-4 text-center flex items-center gap-2">
                  <button
                    className="bg-green-500 p-2 rounded-full text-white hover:bg-green-700 transition-colors duration-200"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    <UpdateUserDetails
                      name={details?.name}
                      email={details?.email}
                      role={details?.role}
                    />
                    <MdModeEdit />
                  </button>

                  <button
                    className="bg-red-500 p-2 rounded-full text-white hover:bg-red-700 transition-colors duration-200"
                    // onClick={() => {
                    //   setUpdateUserDetails(details);
                    //   setOpenUpdateRole(true);
                    // }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
