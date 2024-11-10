import React, { useState } from "react";
import { ROLE } from "../common/Role";

const UpdateUserDetails = ({ name, email, role }) => {
  const [data, setData] = useState({
    name: name || "",
    email: email || "",
    role: role || ""
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="text-black">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg underline">Update User Details!</h3>
          <form className="pt-2">
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
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateUserDetails;
