const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerProduct = async (req, res) => { 
  const { name } = req.body;
  const { message } = await productsService.registerProduct(name);

  res.status(201).json(message);
};

const updateProduct = async (req, res) => { 
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(name, id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.removeProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.searchProducts(q);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  registerProduct,
  updateProduct,
  removeProduct,
  searchProducts,
};
