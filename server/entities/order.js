class Order {
  constructor(date, customerId, isActive, itemsIds) {
    this.date = date;
    this.customerId = customerId;
    this.isActive = isActive;
    this.itemsIds = itemsIds;
  }
}

export { Order };
