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

const removeProduct = async (id) => {
  const findProduct = await productsModel.findById(id);
  
  if (!findProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.remove(id);

  return { type: null };
};

const searchProducts = async (q) => {
    if (!q) {
    const products = await productsModel.findAll();
    return { type: null, message: products };
    }
  const products = await productsModel.findAll();
  const fillteredProduct = products.filter((product) => product.name.includes(q));
  return { type: null, message: fillteredProduct };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
  removeProduct,
  searchProducts,
};