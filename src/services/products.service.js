const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const registerProduct = async (product) => {
  const newProductId = await productsModel.insert(product);
  const newProduct = await productsModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (name, id) => {
  await productsModel.update(name, id);
  const updatedProduct = await productsModel.findById(id);

  if (!updatedProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
};