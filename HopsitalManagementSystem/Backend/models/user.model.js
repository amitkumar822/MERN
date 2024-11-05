import mongoose, {Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
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
    dob: {
        type: String,
        required: [true, "DOB Must Be Required!"],
    },      
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        minLength: [4, "Password Must Be Atleast 4 Characters!"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String
    }
});


// password hashing
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
});

// password hashing compaired
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

// generate jwt token
userSchema.methods.generateJsonWeToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

export const User = mongoose.model("User", userSchema);