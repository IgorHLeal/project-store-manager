const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesController.getSalesById);

salesRouter.get('/', salesController.listSales);

salesRouter.put('/:id', salesController.updateSales);

salesRouter.post('/', salesController.addSales);

salesRouter.delete('/:id', salesController.deleteSales);

module.exports = salesRouter;
