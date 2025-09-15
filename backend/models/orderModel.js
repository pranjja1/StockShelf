// orderModel.js
// backend/models/orderModel.js

const db = require('./db');

// 🔸 Insert a new order and return inserted ID
exports.insertOrder = (customer_name, address, callback) => {
    const sql = `INSERT INTO orders (customer_name, address) VALUES (?, ?)`;
    db.query(sql, [customer_name, address], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.insertId);
    });
};

// 🔸 Insert multiple order items
exports.insertOrderItems = (orderItems, callback) => {
    const sql = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`;
    db.query(sql, [orderItems], (err, result) => {
        if (err) return callback(err);
        callback(null);
    });
};

// 🔸 Update stock for a product
exports.updateProductStock = (product_id, quantity, callback) => {
    const sql = `UPDATE products SET stock = stock - ? WHERE product_id = ?`;
    db.query(sql, [quantity, product_id], (err, result) => {
        if (err) return callback(err);
        callback(null);
    });
};

// 🔸 Get all orders with joined product items
exports.getAllOrders = (callback) => {
    const sql = `
        SELECT o.order_id, o.customer_name, o.address, o.order_time,
               p.name AS product_name, oi.quantity
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        ORDER BY o.order_id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};
