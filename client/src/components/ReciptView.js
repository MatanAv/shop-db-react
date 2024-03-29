import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getPrintedRecipt, setOrderDone } from "../services/api";
import { reciptsTypes } from "../services/configurations";
import { showLoading } from "../services/utils";
import Item from "./Item";

const ReciptView = () => {
  const [reciptDetails, setReciptDetails] = useState({});
  let navigate = useNavigate();
  let location = useLocation();
  let { id } = useParams();

  const getRecipt = async () => {
    const type = location.pathname.includes("order")
      ? reciptsTypes.ORDER
      : reciptsTypes.INVOICE;

    const response = await getPrintedRecipt(id, type);

    setReciptDetails(response.data);
  };

  useEffect(() => {
    getRecipt();
  }, []);

  const setOrderCompleted = async () => {
    await setOrderDone(reciptDetails.id);
  };

  const showReciptView = () => {
    return (
      <div className='recipt-viewer'>
        <ul>
          <li>{reciptDetails.id}</li>
          <li>{reciptDetails.orderDate}</li>
          <li>{reciptDetails.firstName + " " + reciptDetails.lastName}</li>
        </ul>
        <p>Items Purchased:</p>
        <div className='recipt-items'>
          <ui>
            {reciptDetails.items.map((item, i) => {
              return (
                <li>
                  <Item key={i} props={item} />
                </li>
              );
            })}
          </ui>
        </div>
        {location.pathname.includes("order") && (
          <div className='set-order-done'>
            <button
              type='button'
              onClick={async () => {
                setOrderCompleted();
                navigate(`/products`);
              }}
            >
              Complete Order
            </button>
          </div>
        )}
      </div>
    );
  };

  return Object.keys(reciptDetails).length ? showReciptView() : showLoading();
};

export default ReciptView;
