const express = require('express');
const { productsController } = require('../controllers');
const registerProductsValidate = require('../middlewares/registerProductsValidate');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.getProduct);

router.get('/search', productsController.searchProducts);

router.post('/', registerProductsValidate, productsController.registerProduct);

router.put('/:id', registerProductsValidate, productsController.updateProduct);

router.delete('/:id', productsController.removeProduct);

module.exports = router;