import axios from "axios";
axios.defaults.baseURL = `http://localhost:5000/`;

const fetchAllProducts = () => {
  return axios
    .get(`api/products`)
    .then((res) => res.data)
    .catch(alert);
};

const fetchAllCustomers = () => {
  return axios
    .get(`api/customers`)
    .then((res) => res.data)
    .catch(alert);
};

const fetchAllRecipts = (type) => {
  return axios
    .get(`api/recipts/?type=${type}`)
    .then((res) => res.data)
    .catch(alert);
};

const getReciptDetails = (id, type) => {
  return axios
    .get(`api/recipts/${type}/${id}`)
    .then((res) => res.data)
    .catch(alert);
};

const getAllActiveOrders = () => {
  return axios
    .get(`api/recipts/activeorders`)
    .then((res) => res.data)
    .catch(alert);
};

const getPrintedRecipt = (id, type) => {
  return axios
    .get(`api/recipts/view/${type}/${id}`)
    .then((res) => res.data)
    .catch(alert);
};

const createNewOrder = (order) => {
  return axios
    .post(`api/recipts/order/post`, order)
    .then((res) => res.data)
    .catch(alert);
};

export {
  fetchAllProducts,
  fetchAllCustomers,
  fetchAllRecipts,
  getReciptDetails,
  getAllActiveOrders,
  getPrintedRecipt,
  createNewOrder,
};
