const express = require("express");
const {
  getAllRecipts,
  getReciptById,
  getAllActiveOrders,
  getViewById,
  createOrder,
} = require("../storage/recipts");

const router = express.Router();

router.post("/post/order", async (req, res) => {
  const order = req.body;
  const createdOrder = await createOrder(order);

  res.json({ data: createdOrder });
});

router.get("/activeorders", async (req, res) => {
  const orders = await getAllActiveOrders();

  res.json({ data: orders });
});

router.get("/:type/:id", async (req, res) => {
  const { id, type } = req.params;
  const recipt = await getReciptById(id, type);

  res.json({ data: recipt });
});

router.get("/view/:type/:id", async (req, res) => {
  const { id, type } = req.params;
  const recipts = await getViewById(id, type);

  res.json({ data: recipts });
});

router.get("/", async (req, res) => {
  const type = req.query.type;
  const recipts = await getAllRecipts(type);

  res.json({ data: recipts });
});

module.exports = { router };
