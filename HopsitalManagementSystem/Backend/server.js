import app from "./app.js";
import { connectDB } from "./db/index.js";

app.get("/", (req, res) => {
  res.send("Welcome to the express server!");
});

const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed: " + error);
  });
