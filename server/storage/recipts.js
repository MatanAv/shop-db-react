const { runSQL } = require("./db");

const createOrder = async (order) => {
  await runSQL(`BEGIN CreateOrderHeader(:customerId); END;`, [
    order.customerId,
  ]);

  const orderId = (
    await runSQL(`SELECT MAX(order_id) FROM headerorders`)
  )[0][0];

  order.items.forEach(
    async (item, i) =>
      await runSQL(
        `BEGIN AddOrderLine(:orderId, :orderLine, :productId, :quantity); END;`,
        {
          orderId,
          orderLine: i + 1,
          productId: item.productId,
          quantity: item.quantity,
        }
      )
  );

  const createdOrder = { orderId, ...order };

  return createdOrder;
};

const getReciptById = async (id, type) => {
  let recipts;

  if (type === "order") {
    recipts = await runSQL(
      `select 
          JSON_OBJECT('id' is ORDER_ID, 'orderDate' is ORDER_DATE,
          'customerId' is CUSTOMER_ID, 'isActive' is IS_ACTIVE)
          FROM headerorders WHERE order_id = ${id}`
    );
  } else if (type === "invoice") {
    recipts = await runSQL(
      `select 
          JSON_OBJECT('id' is INVOICE_ID , 'orderId' is ORDER_ID,
          'orderDate' is ORDER_DATE, 'customerId' is CUSTOMER_ID)
          FROM headerinvoices WHERE invoice_id = ${id}`
    );
  } else {
    return { success: false };
  }

  recipts = recipts.map((recipt) => JSON.parse(recipt));

  return recipts[0];
};

const getAllRecipts = async (type) => {
  let recipts;

  if (type === "order") {
    recipts = await runSQL(
      `select JSON_OBJECT('id' is ORDER_ID, 'orderDate' is ORDER_DATE, 'customerId' is CUSTOMER_ID)
        FROM headerorders`
    );
  } else if (type === "invoice") {
    recipts = await runSQL(
      `select 
        JSON_OBJECT('id' is INVOICE_ID , 'orderId' is ORDER_ID,
        'orderDate' is ORDER_DATE, 'customerId' is CUSTOMER_ID)
        FROM headerinvoices`
    );
  } else {
    return { success: false };
  }

  recipts = recipts.map((recipt) => JSON.parse(recipt));

  return recipts;
};

const getAllActiveOrders = async () => {
  let orders = await runSQL(
    `select JSON_OBJECT('id' is ORDER_ID, 'orderDate' is ORDER_DATE, 'customerId' is CUSTOMER_ID)
    FROM headerorders WHERE is_active = 1`
  );

  orders = orders.map((order) => JSON.parse(order));

  return orders;
};

const getViewById = async (id, type) => {
  const viewType =
    type === "order" ? "order" : type === "invoice" ? "invoice" : null;

  if (!viewType) return { success: false };

  let reciptsHeader, reciptsLines;

  reciptsHeader = await runSQL(
    `select JSON_OBJECT('id' is ${viewType}_ID, 'orderDate' is ORDER_DATE,
    'firstName' is FIRST_NAME, 'lastName' is LAST_NAME)
    FROM ${viewType}_header_details WHERE ${viewType}_id = :id`,
    [id]
  );

  reciptsLines = await runSQL(
    `select JSON_OBJECT('${viewType}Line' is ${viewType}_LINE,
    'productName' is PRODUCT_NAME, 'quantity' is QUANTITY, 'totalPrice' is TOTAL_PRICE)
    FROM ${viewType}_lines_details WHERE ${viewType}_id = :id`,
    [id]
  );

  reciptsHeader = JSON.parse(reciptsHeader[0]);
  reciptsLines = reciptsLines.map((recipt) => JSON.parse(recipt));

  const reciptView = reciptsHeader;
  reciptView.items = reciptsLines;

  return reciptView;
};

const setOrderDone = async (id) => {
  const isActive = await runSQL(
    `select is_active from headerorders
  where order_id = :id;`,
    [id]
  );

  if (!isActive) return { success: false };

  const response = await runSQL(`BEGIN SETORDERDONE(:o_id); END;`, [id]);

  return response;
};

module.exports = {
  getAllRecipts,
  getReciptById,
  getAllActiveOrders,
  getViewById,
  createOrder,
  setOrderDone,
};
