const Joi = require('joi');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../middlewares/notFoundError');
const { runSchema } = require('../middlewares/validationError');

const productsService = {
  validateBody: runSchema(
    Joi.object({
      name: Joi.string().required().min(5),
    }),
  ),

  async checkIfExists(id) {
    const exists = await productsModel.getProductsById(id);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }
  },

  async listProducts() {
    const productsList = await productsModel.listProducts();
    return productsList;
  },
  async getProductsById(id) {
    const product = await productsModel.getProductsById(id);
    return product;
  },
};

module.exports = productsService;
