const mongoose = require("mongoose");

const mondbUrl = "mongodb://localhost:27017/E-Commerce";

const connectDB = () => {
  return mongoose.connect(mondbUrl);
};

module.exports = { connectDB };