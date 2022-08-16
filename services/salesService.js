const Joi = require('joi');
const salesModel = require('../models/salesModel');
const NotFoundError = require('../middlewares/notFoundError');
const { runSchema } = require('../middlewares/validationError');

const salesService = {
  validateBody: runSchema(Joi.object({
    quantity: Joi.number().required().min(1),
    productId: Joi.number().required(),
  })),

  async checkIfExists(id) {
    const exists = await salesModel.exists(id);
    if (!exists.length) {
      throw new NotFoundError('Sale not found');
    }
  },

  async listSales() {
    const salesList = await salesModel.listSales();
    return salesList;
  },

  async getSalesById(id) {
    const sale = await salesModel.getSalesById(id);
    return sale;
  },
  
  async addSales(sales) {
    const saleId = await salesModel.addSales(sales);
    return { id: saleId, itemsSold: sales };
  },
};

module.exports = salesService;
