const validProductId = 1;
const validProductQuantity = 5;
const validSalesId = 4;

const salesInput = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const invalidSalesInput = [
  {
    "productId": 9999,
    "quantity": 1
  },
  {
    "productId": 09099,
    "quantity": 5
  }
]

const saleRegistered = {
  "id": 4,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = {
  validProductId,
  validProductQuantity,
  validSalesId,
  saleRegistered,
  salesInput,
  invalidSalesInput,
}
