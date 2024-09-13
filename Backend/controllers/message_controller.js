// import Message from "../models/message_model.js";
// import Conversation from "../models/conversation_model.js";
// import { getReceiverSocketId, io } from "../socketIo/server.js";

// export const sendMessage = async (req, res) => {
//   //   console.log("Message send: ", req.params.id, req.body.message);

//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id; // current logged in user

//     let conversation = await Conversation.findOne({
//       members: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         members: [senderId, receiverId],
//       });
//     }
//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//     }

//     await Promise.all([conversation.save(), newMessage.save()]); // both save() at the same time

//     // realtime chat handle
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json({ message: "Message sent successfully", newMessage });
//   } catch (error) {
//     console.log("Error in sendMessage: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: chatUser } = req.params;
//     const senderId = req.user._id;
//     let converstion = await Conversation.findOne({
//       members: { $all: [senderId, chatUser] },
//     }).populate("messages");

//     if (!converstion) {
//       return res.status(201).json([]);
//     }

//     const messages = converstion.messages;
//     res.status(201).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


import Message from "../models/message_model.js";
import Conversation from "../models/conversation_model.js";
// import { getReceiverSocketId, io } from "../socketIo/server.js";
import { getReceiverSocketId, io } from "../socketIo/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // current logged-in user

    // Check if message is provided
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message content is required" });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // Create a new conversation if not found
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // Create a new message object
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add the new message to the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Realtime chat handle: notify receiver if connected
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;
    let converstion = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!converstion) {
      return res.status(201).json([]);
    }

    const messages = converstion.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
