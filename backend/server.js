// server.js
const express = require('express');
const cors = require('cors');
const app = express();

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors());
app.use(express.json());

// API route mounting
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
