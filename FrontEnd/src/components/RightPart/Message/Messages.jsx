import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../../context/useGetMessage.js";
import Loading from "../../Loading.jsx";
import useGetSocketMessage from "../../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage(); // useGetMessage is a custom hook that gets the messages from the database
  useGetSocketMessage(); // useGetSocketMessage is a custom hook that listens for new messages from the socket

  const lastMsgRef = useRef(); // lastMsgRef is a ref that is used to scroll to the last message

  // console.log("messages: ", messages);

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" }); // scroll to the last message
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="px-4 py-4 flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={index} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the converstation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
