const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller.js");
const authenticate = require("../middlewares/authenticate.middleware.js");

router.get("/", authenticate, cartController.findUserCart);
router.put("/add", authenticate, cartController.addItemToCart);

module.exports = router;
