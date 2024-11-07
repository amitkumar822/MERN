import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Enter A Valid Email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "Password Must Contain At Least 4 Characters!"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

// password is hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

// compaire hashing password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// generate jwt token 
userSchema.methods.generateJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    )
}

export const User = mongoose.model("User", userSchema);
