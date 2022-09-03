import { useState, useEffect } from "react";
import { reciptsTypes } from "../services/configurations";

const Recipt = ({ props, isOrder }) => {
  const [recipt, setRecipt] = useState({ ...props });
  const reciptType = isOrder ? reciptsTypes.ORDER : reciptsTypes.INVOICE;

  return (
    <div className={`${reciptType}-item`}>
      <ul>
        <li>{recipt.id}</li>
        <li>{recipt.orderDate}</li>
      </ul>
    </div>
  );
};

export default Recipt;
