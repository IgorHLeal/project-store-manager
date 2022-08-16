const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  async listSales(_req, res) {
    const salesList = await salesService.listSales();

    res.status(200).json(salesList);
  },

  async getSalesById(req, res) {
    const { id } = req.params;

    await salesService.checkIfExists(id);
    const sales = await salesService.getSalesById(id);

    res.status(200).json(sales);
  },

  async addSales(req, res) {
    const sales = req.body;

    const validatedSales = sales.map((sale) => salesService.validateBody(sale));

    const promises = validatedSales
      .map(({ productId }) => productsService.checkIfExists(productId));
    await Promise.all(promises);

    const saleInfo = await salesService.addSales(sales);

    res.status(201).json(saleInfo);
  },
};

module.exports = salesController;