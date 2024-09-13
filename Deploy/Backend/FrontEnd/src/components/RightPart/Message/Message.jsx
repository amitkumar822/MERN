import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  // const itsMe = message.senderId === authUser.user._id;

  const senderId = message.senderId || message.newMessage?.senderId; // Handle undefined senderId
  const itsMe = senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "";

  const createdTime = message.createdAt || message.newMessage?.createdAt; 

  const createdAt = new Date(createdTime);
  const formattedTime = createdAt.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {/* {message.message} */}
          {message.newMessage ? message.newMessage.message : message.message}
        </div>
        <div className="chat-footer text-gray-400">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
