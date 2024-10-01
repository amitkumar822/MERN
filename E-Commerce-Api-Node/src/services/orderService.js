const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const cartService = require("../services/cart.service.js");

const createOrder = async (user, shippAddress) => {
  let address;

  if (shippAddress._id) {
    let existAddress = await Address.findById(shippAddress._id);
    address = existAddress;
  } else {
    address = new Address(shippAddress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user.id);
  const orderItems = [];

  for (let item of cart.cartItems) {
    const orderItem = new orderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounted,
    totalItem: cart.totalItem,
    shippAddress: address,
  });

  const savedOrder = await createOrder.save();
  return savedOrder;
};

const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
};

const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
};

const shipOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
};

const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
};

const canclledOrder = async (orderId) => {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
};

const findOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
};

const usersOrderHistory = async (userId) => {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
};

const deleteOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
};

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  canclledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
