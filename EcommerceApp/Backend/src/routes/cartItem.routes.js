const express = require("express");
const router = express.Router();

const cartItemController = require("../controllers/cartItem.controller.js");
const authenticate = require("../middlewares/authenticate.middleware.js");

router.put("/:id", authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

module.exports = router;
