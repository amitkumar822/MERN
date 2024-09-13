import React from "react";
import User from "./User";
import userGetAllUsers from "../../../context/userGetAllUsers";

function Users() {
  const [allUsers, loading] = userGetAllUsers();
  console.log("GetAllUser: \n", allUsers);

  return (
    <div>
      <h1 className="px-8 py-1 text-xl text-white font-semibold bg-slate-700 rounded-md">
        Message
      </h1>
      <div
        className="flex-1 overflow-y-auto no-scrollbar"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
