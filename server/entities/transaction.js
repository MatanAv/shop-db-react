class Transaction {
  constructor(date, productId, quantity, isCashback, storageId) {
    this.date = date;
    this.productId = productId;
    this.quantity = quantity;
    this.isCashback = isCashback;
    this.storageId = storageId;
  }
}

export { Transaction };
