import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields Must Be Required!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User All Ready Register With This Email" });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", user: savedUser });
  } catch (error) {
    console.log("Error Registering User: ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", Error: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Must Be Required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found With This Email" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password Wrong!" });
    }

    return res.status(201).json({ message: "User Login Successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", Error: error });
  }
};
