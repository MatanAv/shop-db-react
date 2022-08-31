import axios from "axios";

const fetchAllProducts = () => {
  return axios
    .get(`api/products`)
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
    .get(`api/recipts/post/order`, order)
    .then((res) => res.data)
    .catch(alert);
};

export {
  fetchAllProducts,
  fetchAllRecipts,
  getReciptDetails,
  getAllActiveOrders,
  getPrintedRecipt,
  createNewOrder,
};
