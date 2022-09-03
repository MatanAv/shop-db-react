const { runSQL } = require("./db");

const getInventory = async () => {
  const inventory = await runSQL(`SELECT 
  JSON_OBJECT('productId' is PRODUCT_ID , 'storageId' is STORAGE_ID,'quantity' is QUANTITY)
  FROM inventory`);

  return inventory.map((item) => JSON.parse(item));
};

module.exports = { getInventory };
