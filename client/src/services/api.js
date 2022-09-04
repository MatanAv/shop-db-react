import axios from "axios";
axios.defaults.baseURL = `http://localhost:5000/`;

const fetchAllProducts = async () => {
  return await axios
    .get(`api/products`)
    .then((res) => res.data)
    .catch(alert);
};

const fetchAllCustomers = async () => {
  return await axios
    .get(`api/customers`)
    .then((res) => res.data)
    .catch(alert);
};

const fetchAllRecipts = async (type) => {
  return await axios
    .get(`api/recipts/?type=${type}`)
    .then((res) => res.data)
    .catch(alert);
};

const fetchInventoryList = async () => {
  return await axios
    .get(`api/inventory`)
    .then((res) => res.data)
    .catch(alert);
};

const getReciptDetails = async (id, type) => {
  return await axios
    .get(`api/recipts/${type}/${id}`)
    .then((res) => res.data)
    .catch(alert);
};

const getAllActiveOrders = async () => {
  return await axios
    .get(`api/recipts/activeorders`)
    .then((res) => res.data)
    .catch(alert);
};

const getPrintedRecipt = async (id, type) => {
  return await axios
    .get(`api/recipts/view/${type}/${id}`)
    .then((res) => res.data)
    .catch(alert);
};

const createNewOrder = async (order) => {
  return await axios
    .post(`api/recipts/order/post`, order)
    .then((res) => res.data)
    .catch(alert);
};

const setOrderDone = async (id) => {
  return await axios
    .put(`api/recipts/order/complete/${id}`)
    .then((res) => res.data)
    .catch(alert);
};

export {
  fetchAllProducts,
  fetchAllCustomers,
  fetchAllRecipts,
  fetchInventoryList,
  getReciptDetails,
  getAllActiveOrders,
  getPrintedRecipt,
  createNewOrder,
  setOrderDone,
};
