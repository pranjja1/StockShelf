// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/low-stock', productController.getLowStockProducts);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
