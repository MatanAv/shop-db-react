class Invoice {
  constructor(orderId, orderDate, customerId, itemsIds) {
    this.orderId = orderId;
    this.orderDate = orderDate;
    this.customerId = customerId;
    this.itemsIds = itemsIds;
  }
}

export { Invoice };
