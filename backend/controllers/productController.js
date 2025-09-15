// productController.js
// backend/controllers/productController.js

const db = require('../models/db');

// Get all products
exports.getAllProducts = (req, res) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch products", details: err });
        res.json(results);
    });
};

// Get products with stock below minimum
exports.getLowStockProducts = (req, res) => {
    const sql = "SELECT * FROM products WHERE stock <= min_stock_limit";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Failed to fetch low stock products", details: err });
        res.json(results);
    });
};

// Add a new product
exports.addProduct = (req, res) => {
    const { name, category, description, price, stock, min_stock_limit } = req.body;

    if (!name || !category || !price || stock == null || min_stock_limit == null) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
        INSERT INTO products (name, category, description, price, stock, min_stock_limit)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, category, description, price, stock, min_stock_limit], (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to add product", details: err });
        res.status(201).json({ message: "Product added successfully", product_id: result.insertId });
    });
};

// Update a product
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, category, description, price, stock, min_stock_limit } = req.body;

    const sql = `
        UPDATE products
        SET name = ?, category = ?, description = ?, price = ?, stock = ?, min_stock_limit = ?
        WHERE product_id = ?
    `;

    db.query(sql, [name, category, description, price, stock, min_stock_limit, id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to update product", details: err });
        res.json({ message: "Product updated successfully" });
    });
};

// Delete a product
exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE product_id = ?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to delete product", details: err });
        res.json({ message: "Product deleted successfully" });
    });
};
