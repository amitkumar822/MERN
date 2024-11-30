import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import UpdateUserDetails from "../../components/AdminPannel/UpdateUserDetails";
import DeleteUser from "../../components/AdminPannel/DeleteUser";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState(null);

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

  // Update User Details Modal Open
  useEffect(() => {
    if (selectedUser) {
      const modal = document.getElementById("my_modal_2");
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedUser]);

  // Delete User Details Modal Open
  useEffect(() => {
    if (userId) {
      const modal = document.getElementById("my_modal_1");
      if (modal) {
        modal.showModal();
      }
    }
  }, [userId]);

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
                  <div onClick={() => setSelectedUser(details)}>
                    <IconButton>
                      <ModeEditIcon
                        sx={{
                          bgcolor: "green",
                          color: "white",
                          width: "30px",
                          height: "30px",
                          padding: "5px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </div>
                  <div onClick={() => setUserId(details._id)}>
                    <IconButton>
                      <DeleteIcon
                        sx={{
                          bgcolor: "red",
                          color: "white",
                          width: "30px",
                          height: "30px",
                          padding: "4px",
                          borderRadius: "50%",
                        }}
                      />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conditionally render UpdateUserDetails and pass selected user details */}
      {selectedUser && (
        <UpdateUserDetails
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          fetchAllUsers={fetchAllUsers}
        />
      )}

      {userId && (
        <DeleteUser
          userId={userId}
          setUserId={setUserId}
          fetchAllUsers={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
