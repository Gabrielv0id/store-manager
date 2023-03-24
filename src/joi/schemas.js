const joi = require('joi');

const productsSchema = joi.object({
  name: joi.string().min(5).required().label('name'),
});

const salesSchema = joi.object({
  productId: joi.number().min(1).required().label('productId'),
  quantity: joi.number().min(1).required().label('quantity'),
});

module.exports = {
  productsSchema,
  salesSchema,
};