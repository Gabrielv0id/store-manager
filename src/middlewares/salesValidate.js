const joi = require('joi');
const { salesSchema } = require('../joi/schemas');

module.exports = (req, res, next) => {
  const products = req.body;
  const producstArrSchema = joi.array().items(salesSchema);
  const { error } = producstArrSchema.validate(products);
  if (error) {  
    if (error.details[0].type === 'number.min') {
      return res.status(422).json({ message: error.message });
    } 
    return res.status(400).json({ message: error.message });
  }
  next();
};