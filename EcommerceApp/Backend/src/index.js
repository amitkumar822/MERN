const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(201)
    .send({ message: "Welcome to ecommerce api node!", status: true });
});

const authRouters = require("./routes/auth.route.js");
app.use("/api/auth", authRouters);

const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters);

const productRouters = require("./routes/product.routes.js");
app.use("/api/products", productRouters);

const adminProductRouters = require("./routes/adminProduct.routes.js");
app.use("/api/admin/products", adminProductRouters);

const cartRouters = require("./routes/cart.routes.js");
app.use("/api/cart", cartRouters);

const cartItemRouter = require("./routes/cartItem.routes.js");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders", orderRouter);

const adminOrderRoutes = require("./routes/adminOrder.routes.js")
app.use("/api/admin/orders", adminOrderRoutes);

const reviewRouters = require("./routes/review.routes.js")
app.use('/api/reviews', reviewRouters)

const ratingRouters = require("./routes/rating.routes.js")
app.use('/api/ratings', ratingRouters)

module.exports = app;
