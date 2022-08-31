const express = require("express");
const { getAllProducts } = require("../storage/products");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.json({ data: products });
});

module.exports = { router };
