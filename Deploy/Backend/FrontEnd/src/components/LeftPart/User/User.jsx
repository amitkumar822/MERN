import React from "react";
import userConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";

function User({ user }) {
  // this line when you select particular user so this user selected show 
  const { selectedConversation, setSelectedConversation } = userConversation();
  const isSelected = selectedConversation?._id === user._id;
  
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id)

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center mt-2 space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${ isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            {/* <img src="data:image/jpeg;base64,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" /> */}
            <img src="data:image/jpeg;base64,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" alt="" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold italic">{user.fullName}</h1>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;