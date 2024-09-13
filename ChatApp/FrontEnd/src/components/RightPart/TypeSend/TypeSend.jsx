import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../../context/useSendMessage.js";

function TypeSend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form  onClick={handleSubmit}>
      <div className="h-[8vh] flex items-center space-x-1 bg-gray-800">
        <div className="w-[70%] ml-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type here"
            className="w-full border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3"
          />
        </div>
        <button>
          <IoMdSend className="text-3xl"/>
        </button>
      </div>
    </form>
  );
}

export default TypeSend;
