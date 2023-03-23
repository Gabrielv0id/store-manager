const joi = require('joi');

const productsSchema = joi.object({
  name: joi.string().min(5).required().label('name'),
});

module.exports = productsSchema;