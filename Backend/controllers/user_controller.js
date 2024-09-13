import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../JWT/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password do not match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already register!" });
    }

    // Password Hashing
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashPassword });

    await newUser.save();

    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      });
    } else {
      res.status(400).json({ error: "User not created" });
    }
  } catch (error) {
    console.log("Error in signup: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If user is not found, send error response and return to stop further execution
    if (!user) {
      return res.status(400).json({ error: "Invalid user credential" }); // Fix: Added 'return'
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    // If password doesn't match, send error response and return to stop further execution
    if (!isMatchPassword) {
      return res.status(400).json({ error: "Invalid user credential" }); // Fix: Added 'return'
    }

    // Create token and save in cookie if login is successful
    createTokenAndSaveCookie(user._id, res);

    // If everything is successful, send the success response
    return res.status(201).json({
      // Fix: Added 'return' here as well to ensure function exits
      message: "User login successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    // If an error occurs, log it and send error response
    console.log("Error login: " + error);
    return res.status(500).json({ error: "Internal server error" }); // Fix: Added 'return'
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error Logout: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    // find current online user
    const loggedInUser = req.user._id;
    // here this function (_id: { $ne: loggedInUser }) not select current online user 
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
