import app from "./app.js";

app.get("/", (req, res) => {
  res.send("Welcome to the express server!");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
