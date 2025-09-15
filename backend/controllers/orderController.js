// backend/controllers/orderController.js

const orderModel = require('../models/orderModel');

// Create a new order
exports.createOrder = (req, res) => {
    const { customer_name, address, items } = req.body;

    if (!customer_name || !address || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Invalid order details" });
    }

    // Step 1: Insert into orders table
    orderModel.insertOrder(customer_name, address, (err, orderId) => {
        if (err) return res.status(500).json({ error: "Failed to create order", details: err });

        // Step 2: Insert into order_items
        const orderItems = items.map(item => [orderId, item.product_id, item.quantity]);

        orderModel.insertOrderItems(orderItems, (err) => {
            if (err) return res.status(500).json({ error: "Failed to insert order items", details: err });

            // Step 3: Update product stock
            const updatePromises = items.map(item => {
                return new Promise((resolve, reject) => {
                    orderModel.updateProductStock(item.product_id, item.quantity, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            });

            Promise.all(updatePromises)
                .then(() => res.status(201).json({ message: "Order placed successfully", order_id: orderId }))
                .catch(err => res.status(500).json({ error: "Failed to update stock", details: err }));
        });
    });
};

// Get all orders
exports.getAllOrders = (req, res) => {
    orderModel.getAllOrders((err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch orders", details: err });

        const orders = {};

        results.forEach(row => {
            if (!orders[row.order_id]) {
                orders[row.order_id] = {
                    order_id: row.order_id,
                    customer_name: row.customer_name,
                    address: row.address,
                    order_time: row.order_time,
                    items: []
                };
            }

            orders[row.order_id].items.push({
                product_name: row.product_name,
                quantity: row.quantity
            });
        });

        res.json(Object.values(orders));
    });
};
