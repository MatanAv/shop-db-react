import { useState, useEffect } from "react";
import { fetchAllProducts } from "../services/api";
import { showLoading } from "../services/utils";
import Product from "./Product";

const ProductsPage = () => {
  const [productsList, setProductsList] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  {
    console.log("here");
  }

  const getProducts = async () => {
    const response = await fetchAllProducts();

    setProductsList(response.data);
  };

  const initOrderItems = () => {
    const items = {};
    productsList.forEach((product) => (items[product.id] = 0));

    setOrderItems(items);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // useEffect(() => {
  //   initOrderItems();
  // }, [productsList]);

  const showProducts = () => {
    return (
      <div className='products-list'>
        <ul>
          {productsList.map((product) => (
            <Product key={product.id} props={product} />
          ))}

          {/* {productsList.map((product) => {
            console.log(product);
            return (
              <li>
                <Product key={product.id} props={product} />
                <input
                  type='number'
                  min='-9'
                  max='9'
                  // onChange={(e) => {
                  //   setOrderItems((prev) => {
                  //     return { ...prev, [product.id]: e.target.value };
                  //   });
                  //   setTotalPrice(
                  //     (prev) => prev + product.price * Number(e.target.value)
                  //   );
                  // }}
                ></input>
              </li>
            );
          })} */}
        </ul>
      </div>
    );
  };

  return (
    <section className='products-page'>
      <p>There are {productsList.length} products.</p>
      {productsList.length ? showProducts() : showLoading()}
      <p>
        <s>Total price: {totalPrice}$</s>
      </p>
    </section>
  );
};

export default ProductsPage;
