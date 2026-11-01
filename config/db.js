
const mysql = require('mysql2/promise');
require('dotenv').config();


console.log('Host MySQL:', process.env.DB_HOST);
console.log('Puerto MySQL:', process.env.DB_PORT);
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0
});

module.exports = db;
