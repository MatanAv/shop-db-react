import { useState, useEffect } from "react";
import { showLoading } from "../services/utils";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import {
  fetchAllProducts,
  fetchAllCustomers,
  createNewOrder,
} from "../services/api";

const ProductsPage = () => {
  const [productsList, setProductsList] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [customersList, setCustomersList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  let navigate = useNavigate();

  const getProducts = async () => {
    const response = await fetchAllProducts();

    setProductsList(response.data);
  };

  const getCustomers = async () => {
    const response = await fetchAllCustomers();

    setCustomersList(response.data);
  };

  const initOrderItems = () => {
    const items = {};
    productsList.forEach((product) => (items[product.id] = 0));

    setOrderItems(items);
  };

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  useEffect(() => {
    initOrderItems();
  }, [productsList]);

  useEffect(() => {
    setSelectedCustomer(customersList[0]);
  }, [customersList]);

  const showProducts = () => {
    return (
      <ul>
        {productsList.map((product) => {
          return (
            <li>
              <Product key={product.id} props={product} />
              <input
                type='number'
                min='-9'
                max='9'
                value={orderItems[product.id]}
                onChange={(e) => {
                  setOrderItems((prev) => {
                    return { ...prev, [product.id]: Number(e.target.value) };
                  });
                  setTotalPrice(
                    (prev) => prev + product.price * Number(e.target.value)
                  );
                }}
              ></input>
            </li>
          );
        })}
      </ul>
    );
  };

  const showCustomers = () => {
    return (
      <div className='select-customer'>
        <p>Select Customer:</p>
        <select
          value={selectedCustomer.id}
          onChange={(e) =>
            setSelectedCustomer(
              customersList.find(
                (customer) => customer.id === Number(e.target.value)
              )
            )
          }
        >
          {customersList.map((customer) => {
            return <option key={customer.id}>{customer.id}</option>;
          })}
        </select>
        <h4>{selectedCustomer.firstName + " " + selectedCustomer.lastName}</h4>
      </div>
    );
  };

  const handleSubmitOrder = async () => {
    const itemsArray = Object.entries(orderItems);
    const items = itemsArray
      .filter((item) => item[1] !== 0)
      .map((item) => {
        return { productId: item[0], quantity: item[1] };
      });

    const orderDetails = {
      customerId: Number(selectedCustomer.id),
      items,
    };

    const response = await createNewOrder(orderDetails);

    navigate("/");
  };

  return (
    <section className='products-page'>
      <h3>There are {productsList.length} products.</h3>
      <div className='customers-list'>
        {selectedCustomer ? showCustomers() : showLoading()}
      </div>
      <div className='products-list'>
        {productsList.length ? showProducts() : showLoading()}
      </div>
      <p>
        <strong>Total price: {parseFloat(totalPrice).toFixed(2)}$</strong>
      </p>
      <button type='button' onClick={handleSubmitOrder}>
        Submit
      </button>
    </section>
  );
};

export default ProductsPage;
