import { config } from "dotenv";
config({ path: ".env" });
import { connectDB } from "./src/db/connectDB.js";
import { app } from "./app.js";


const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed: " + error);
  });
