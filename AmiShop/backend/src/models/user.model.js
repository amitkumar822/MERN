import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      minLength: [10, "Mobile number must be at least 10 digits"],
      maxLength: [13, "Mobile number must be at most 13 digits"],
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    dob: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please Enter A Valid Email",
      ], //email validation regex 
      // validate: [validator.isEmail, "Please Enter A Valid Email"],
    },
    password: {
      type: String,
      // required: true,
      select: false,
      minLength: [4, "Password Must Contain At Least 4 Characters!"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "GENERAL"],
      default: "GENERAL",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

// password is hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compaire hashing password 
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// generate jwt token
userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
