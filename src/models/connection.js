const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  // port: process.env.PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;