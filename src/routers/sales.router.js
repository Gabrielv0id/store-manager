const express = require('express');
const { salesController } = require('../controllers');
const salesValidate = require('../middlewares/salesValidate');

const router = express.Router();

router.get('/', salesController.listSales);

router.get('/:id', salesController.getSale);

router.post('/', salesValidate, salesController.registerSales);

router.delete('/:id', salesController.removeSale);

module.exports = router;