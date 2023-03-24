const { productsModel, salesModel } = require('../models');

const productsExist = async (sales) => {
  const promises = sales.map(({ productId }) => productsModel.findById(productId));

  const productsIds = await Promise.all(promises);

  const productsList = productsIds.every((product) => product !== undefined);

  if (productsList) {
    return true;
  }
  return false;
};

const registerSales = async (sales) => {
  if (await productsExist(sales)) {
    const saleId = await salesModel.insertSales();
    const promises = sales.map(({ productId, quantity }) =>
      salesModel.insertSalesProducts(saleId, productId, quantity));
    
    await Promise.all(promises);

    return { type: null, message: { id: saleId, itemsSold: sales } };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
 };

module.exports = {
  registerSales,
};