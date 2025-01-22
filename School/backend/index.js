import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
import { connectDB } from "./src/db/dbConnect.js";

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

const PORT = process.env.PORT || 4001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`DB Connected: ${process.env.DBNAME}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
