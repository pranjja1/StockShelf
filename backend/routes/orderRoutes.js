// orderRoutes.js
// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// 📦 Create a new order
router.post('/orders', orderController.createOrder);

// 📋 Get all orders with items
router.get('/orders', orderController.getAllOrders);

module.exports = router;
