// This file is responsible for creating a connection pool to the MySQL database using the mysql2 library.
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

});


// Test the connection to the database
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log(' Connected to the database');
        connection.release(); // Always release
    } catch (err) {
        console.error(' Database connection failed:', err.message);
    }
})();

// Export the pool for use in other modules
module.exports = {
    pool,
    mysql
};