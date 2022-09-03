import { useState } from "react";

const Item = ({ props }) => {
  const [item, setItem] = useState({ ...props });
  return (
    <div className='item'>
      <ul>
        <li>{item.productName}</li>
        <li>Quantity: {item.quantity}</li>
        <li>
          <strong>{item.totalPrice}$</strong>
        </li>
      </ul>
    </div>
  );
};

export default Item;
