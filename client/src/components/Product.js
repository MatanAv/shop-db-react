import { useState, useEffect } from "react";
import { showLoading } from "../services/utils";

const Product = () => {
  const [product, setProduct] = useState({});

  const showProduct = () => {
    return (
      <div className='product-item'>
        <ul>
          <li>{product.name}</li>
          <li>{product.price}</li>
        </ul>
      </div>
    );
  };

  return product ? showProduct() : showLoading;
};

export default Product;
