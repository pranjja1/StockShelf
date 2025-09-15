// productModel.js
const productModel = require('../models/productModel');

productModel.getAllProducts((err, results) => {
    if (err) res.status(500).json({ error: "..." });
    else res.json(results);
});
