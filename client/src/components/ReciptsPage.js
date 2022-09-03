import { useState, useEffect } from "react";
import { showLoading } from "../services/utils";
import { reciptsTypes } from "../services/configurations";
import { Link, useLocation } from "react-router-dom";
import { fetchAllRecipts, getAllActiveOrders } from "../services/api";
import Recipt from "./Recipt";

const ReciptsPage = () => {
  const [reciptsList, setReciptsList] = useState([]);
  const [reciptType, setReciptType] = useState("");
  let location = useLocation();

  useEffect(() => {
    setReciptType(() => {
      return location.pathname.includes("history")
        ? reciptsTypes.INVOICE
        : reciptsTypes.ORDER;
    });
  }, [location.pathname]);

  const getRecipts = async () => {
    const response =
      reciptType === "order"
        ? await getAllActiveOrders()
        : await fetchAllRecipts(reciptType);

    setReciptsList(response.data);
  };

  useEffect(() => {
    getRecipts();
  }, [reciptType]);

  const showRecipts = () => {
    return (
      <ul>
        {reciptsList.map((recipt) => {
          return (
            <li key={recipt.id}>
              <Recipt props={recipt} isOrder={reciptType === "order"}></Recipt>
              <Link to={`/view/${reciptType}/${recipt.id}`}>
                <button type='button'>View {reciptType}</button>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className='recipts-page'>
      <h3>{`There are ${reciptsList.length} ${reciptType}s.`}</h3>
      <div className='recipts-list'>
        {reciptsList.length ? showRecipts() : showLoading()}
      </div>
    </section>
  );
};

export default ReciptsPage;
