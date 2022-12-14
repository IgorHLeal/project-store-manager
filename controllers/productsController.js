const productsService = require('../services/productsService');

const productsController = {
  async listProducts(_req, res) {
    const productsList = await productsService.listProducts();

    res.status(200).json(productsList);
  },

  async getProductsById(req, res) {
    const { id } = req.params;

    await productsService.checkIfExists(id);
    const product = await productsService.getProductsById(id);

    res.status(200).json(product);
  },

  async getProductsByName(req, res) {
    const { q } = req.query;

    const products = await productsService.getProductsByName(q);

    res.status(200).json(products);
  },

  async addProducts(req, res) {
    const { name } = productsService.validateBody(req.body);

    const product = await productsService.addProducts(name);

    res.status(201).json(product);
  },

  async updateProducts(req, res) {
    const { name } = productsService.validateBody(req.body);
    const { id } = req.params;

    await productsService.checkIfExists(id);

    const product = await productsService.updateProducts(id, name);

    res.status(200).json(product);
  },

  async deleteProcucts(req, res) {
    const { id } = req.params;

    await productsService.checkIfExists(id);
    await productsService.deleteProcucts(id);

    res.sendStatus(204);
  },
};

module.exports = productsController;
