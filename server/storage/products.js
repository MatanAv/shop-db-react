const { runSQL } = require("./db");

const getAllProducts = async () => {
  let products = await runSQL(
    `select 
    JSON_OBJECT('id' is PRODUCT_ID , 'name' is PRODUCT_NAME,'price' is PRICE)
    from products`
  );

  products = products.map((product) => JSON.parse(product));

  return products;
};

module.exports = { getAllProducts };
