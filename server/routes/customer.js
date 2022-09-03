const express = require("express");
const { getAllCustomers, createCustomer } = require("../storage/customer");

const router = express.Router();

router.post("/create", async (req, res) => {
  const customerName = req.query;
  const customer = await createCustomer(customerName);

  res.json({ data: customer });
});

router.get("/", async (req, res) => {
  const customers = await getAllCustomers();

  res.json({ data: customers });
});

module.exports = { router };
