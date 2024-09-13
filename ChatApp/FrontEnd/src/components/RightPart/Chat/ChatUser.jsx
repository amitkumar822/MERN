import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import {CiMenuFries } from "react-icons/ci"

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineuserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="h-[8vh] flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src="data:image/jpeg;base64,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" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold italic">
            {selectedConversation?.fullName}
          </h1>
          <span className="text-sm text-gray-400">
            {getOnlineuserStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;
