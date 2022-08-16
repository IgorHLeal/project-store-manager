const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/:id', productsController.getProductsById);

productsRouter.get('/', productsController.listProducts);

module.exports = productsRouter;