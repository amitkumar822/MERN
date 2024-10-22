const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review.controller.js");
const authenticate = require("../middlewares/authenticate.middleware.js");

router.post("/create", authenticate, reviewController.createReview);
router.get("/product/:productId", authenticate, reviewController.getAllReview);

module.exports = router;
