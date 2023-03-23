const productsSchema = require('../joi/schemas');

module.exports = (req, res, next) => {
  const { name } = req.body;
  const { error } = productsSchema.validate({ name });

  if (error) {
    if (error.details[0].type === 'string.min') {
      return res.status(422).json({ message: error.message });
    } 
    return res.status(400).json({ message: error.message });
  }
  next();
};