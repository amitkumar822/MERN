import mongoose, {Schema} from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "Password Must Contain At Least 4 Characters!"],
    },
    avatar: {
        public_id: String,
        url: String,
    }
})

export const User = mongoose.model("User", userSchema);