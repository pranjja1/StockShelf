// db.js
// backend/models/db.js

const mysql = require('mysql2');

// Create MySQL connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'inventory_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL database");
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = db;
