const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller.js");
const authenticate = require("../middlewares/authenticate.middleware.js");

router.post("/create", authenticate, ratingController.createRating);
router.put("/product/:productId", authenticate, ratingController.getAllRatings);

module.exports = router;
