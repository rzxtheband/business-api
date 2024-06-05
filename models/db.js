const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: 'srv922.hstgr.io', // Replace with your MySQL host
  user: 'u832555779_business_api', // Your MySQL user
  password: 'BusinessApiAdmin@123', // Your MySQL password
  database: 'u832555779_business_api', // Your MySQL database
  waitForConnections: true,
  connectionLimit: 10, // Number of connections in the pool
  queueLimit: 0, // No limit to the queue size
});

// Event listener to log successful connections
pool.on('connection', (connection) => {
  console.log('Successfully connected to the MySQL database.');
});

// Event listener to catch errors with connections
pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Export the pool
module.exports = pool;
