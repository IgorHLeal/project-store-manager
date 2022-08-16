const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/:id', productsController.getProductsById);

productsRouter.get('/', productsController.listProducts);

productsRouter.put('/:id', productsController.updateProducts);

productsRouter.post('/', productsController.addProducts);

module.exports = productsRouter;
