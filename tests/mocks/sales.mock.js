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

const sales = [
  {
    "saleId": 1,
    "date": '2023-03-26T23:17:26.000Z',
    "productId": 1,
    quantity: 5
  },
  {
    "saleId": 1,
    "date": '2023-03-26T23:17:26.000Z',
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": '2023-03-26T23:17:26.000Z',
    "productId": 3,
    "quantity": 15
  }
]

const saleById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
]

const removeSaleReturn = [
   {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
]

const salesUpdated = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
]

const saleUpdate = {
  "saleId": 1,
  "itemsUpdated": [
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
  sales,
  saleById,
  removeSaleReturn,
  salesUpdated,
  saleUpdate,
}
