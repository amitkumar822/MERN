const orderService = require("../services/orderService.js");

const getAllOrders = async (req, res) => {
  try {
    const order = await orderService.getAllOrders();
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const confirmedOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderService.confirmedOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shippOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderService.shipOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderService.deliverOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelledOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderService.canclledOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await orderService.deleteOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
    getAllOrders,
    confirmedOrders,
    shippOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders,
}