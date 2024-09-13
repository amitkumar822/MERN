import React, { useEffect, useState } from "react";
import useConversation from "../components/zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          setMessage(response.data);
          setLoading(false);
        } catch (error) {
            setLoading(false);
          console.log("Error in getting messages", error);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
