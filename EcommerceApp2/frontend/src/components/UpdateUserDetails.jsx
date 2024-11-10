import React, { useContext, useState } from "react";
import { ROLE } from "../common/Role";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateUserDetails = ({
  selectedUser,
  setSelectedUser,
  fetchAllUsers,
}) => {
  const [data, setData] = useState({
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    role: selectedUser?.role || "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const rep = await axios.post(
        `/api/user/update-user-details/${selectedUser?._id}`,
        data,
        {
          credentials: "include",
        }
      );
      fetchAllUsers();
      toast.success("Updated user details successfully!");
      // Close the modal after success
      document.getElementById("my_modal_3").close();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update, Please try again!"
      );
    }
  };

  return (
    <div className="text-black">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={() => setSelectedUser("")}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg underline text-center">Update User Details!</h3>

          <form onSubmit={handleUpdate} className="pt-2">
            <div className="flex flex-col items-start">
              <label htmlFor="name">Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={data.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Change Your Name!"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="email">Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Change Your Email!"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between my-4">
              <p>Role :</p>
              <select
                className="border px-4 py-1"
                name="role"
                value={data.role} // Default to the current role
                onChange={handleInputChange}
              >
                {Object.values(ROLE).map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex justify-center items-center">
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-full shadow shadow-gray-600 duration-200">
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateUserDetails;
