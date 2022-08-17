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

  async getProductsByName(searchTerm) {
    const products = await productsModel.getProductsByName(searchTerm);
    return products;
  },

  async addProducts(name) {
    const productId = await productsModel.addProducts(name);
    return { id: productId, name };
  },

  async updateProducts(id, name) {
    await productsModel.updateProducts(id, name);
    return { id, name };
  },

  async deleteProcucts(id) {
    await productsModel.deleteProcucts(id);
  },
};

module.exports = productsService;
