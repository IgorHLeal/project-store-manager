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
};

module.exports = productsController;
