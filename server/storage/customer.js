const { runSQL } = require("./db");

const getAllCustomers = async () => {
  let customers = await runSQL(
    `select JSON_OBJECT('id' is CUSTOMER_ID , 'firstName' is FIRST_NAME,
    'lastName' is LAST_NAME) from customers`
  );

  customers = customers.map((customer) => JSON.parse(customer));

  return customers;
};

const createCustomer = async (fullName) => {
  await runSQL(`BEGIN CREATECUSTOMER(:c_fname , :c_lname); END;`, [
    fullName.firstname,
    fullName.lastname,
  ]);

  const customerId = (
    await runSQL(`SELECT MAX(customer_id) FROM customers`)
  )[0][0];

  const createCustomer = { customerId, ...fullName };

  return createCustomer;
};

module.exports = { getAllCustomers, createCustomer };
