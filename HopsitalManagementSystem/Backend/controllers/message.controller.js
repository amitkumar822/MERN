import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
    const {firstName, lastName, email, phone, message} = req.body;
    
    if(!firstName ||!lastName ||!email ||!phone ||!message) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const newMessage = new Message({firstName, lastName, email, phone, message});
        await newMessage.save();
        res.status(201).json({message: "Message sent successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error, please try again later"});
    }
}