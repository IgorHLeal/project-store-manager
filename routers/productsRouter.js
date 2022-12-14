const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/search', productsController.getProductsByName);

productsRouter.get('/:id', productsController.getProductsById);

productsRouter.get('/', productsController.listProducts);

productsRouter.put('/:id', productsController.updateProducts);

productsRouter.post('/', productsController.addProducts);

productsRouter.delete('/:id', productsController.deleteProcucts);

module.exports = productsRouter;
