import { useState, useEffect } from "react";
import { fetchInventoryList } from "../services/api";
import { showLoading } from "../services/utils";
import "../css/Inventory.css";

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);

  const getInventory = async () => {
    const response = await fetchInventoryList();

    setInventoryList(response.data);
  };

  useEffect(() => {
    getInventory();
  }, []);

  const showInventory = () => {
    return (
      <div className='inventory-list'>
        <ul>
          {inventoryList.map((item) => {
            return (
              <li>
                <div className='inventory-item'>
                  <ul>
                    <li>Product ID: {item.productId}</li>
                    <li>Storage ID: {item.storageId}</li>
                    <li>Quantity: {item.quantity}</li>
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return inventoryList.length ? showInventory() : showLoading();
};

export default Inventory;
