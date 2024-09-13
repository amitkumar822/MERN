import React, { useState } from "react";
import axios from "axios";
import useConversation from "../components/zustand/useConversation.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      setMessage([...messages, response.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };

  return { loading, sendMessages };
}

export default useSendMessage;
