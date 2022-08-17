const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesController.getSalesById);

salesRouter.get('/', salesController.listSales);

salesRouter.put('/:id', salesController.update);

salesRouter.post('/', salesController.addSales);

salesRouter.delete('/:id', salesController.remove);

module.exports = salesRouter;
