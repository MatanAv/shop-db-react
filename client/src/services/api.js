import axios from "axios";

const fetchAllProducts = () => {
  return axios
    .get(`/products`)
    .then((res) => res.data)
    .catch((error) => alert(error));
};

export { fetchAllProducts };
