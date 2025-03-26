import { config } from "dotenv";
import { connectDB } from "./src/db/index.js";
import { app } from "./app.js";

config({ path: ".env" });


const PORT = process.env.PORT || 4001;

app.get("/", (req, res) => {
  res.send("Welcome To AmiShop API!");
});

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
