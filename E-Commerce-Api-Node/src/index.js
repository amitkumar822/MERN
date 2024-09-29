const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.status(201).send({ message : "Welcome to ecommerce api node!", status : true });
})

module.exports = app;
