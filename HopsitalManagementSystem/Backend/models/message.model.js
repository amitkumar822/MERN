import mongoose, {Schema} from "mongoose";
import validator from "validator";

const messageSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain At Least 10 Characters!"],
        maxLength: [14, "Phone Number Must Contain At Least 14 Characters!"]
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message Must Contain At Least 10 Charactersl!"]
    },
});

export const Message = mongoose.model("Message", messageSchema);