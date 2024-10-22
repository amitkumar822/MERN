import mongoose, {Schema} from "mongoose";
import validator from "validator"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, "please enter a valid email address"]
    },
    phone: {
        type: String,
        required: true,
        // unique: true,
    },
    // photo: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    education: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 4,
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const User = mongoose.model("User", userSchema)
