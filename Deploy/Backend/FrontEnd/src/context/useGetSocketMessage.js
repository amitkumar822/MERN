import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../components/zustand/useConversation.js";
import sound from "../assets/message_notification.mp3"

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
        const notificationSound = new Audio(sound);
        notificationSound.play();
      setMessage([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage]);
};

export default useGetSocketMessage;
