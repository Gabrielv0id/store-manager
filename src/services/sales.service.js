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

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
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
 
const removeSale = async (id) => {
  const findSale = await salesModel.findById(id);
  
  if (findSale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.remove(id);

  return { type: null };
};

const updateSale = async (sale, id) => {
  const findSale = await salesModel.findById(id);

  if (findSale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  if (await productsExist(sale)) {
    const promises = sale.map(({ productId, quantity }) => (
    salesModel.update(id, productId, quantity)
    ));
  
    await Promise.all(promises);

    return { type: null, message: { saleId: id, itemsUpdated: sale } };
  }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  registerSales,
  findAll,
  findById,
  removeSale,
  updateSale,
};