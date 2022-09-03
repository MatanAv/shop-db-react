const express = require("express");
const { getInventory } = require("../storage/inventory");

const router = express.Router();

router.get("/", async (req, res) => {
  let inventory = await getInventory();

  res.json({ data: inventory });
});

module.exports = { router };
