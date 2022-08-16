const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesController.getSalesById);

salesRouter.get('/', salesController.listSales);

salesRouter.post('/', salesController.addSales);

module.exports = salesRouter;
