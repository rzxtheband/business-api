const express = require('express');
const cors = require('cors');
const app = express();
const businessRoutes = require('./routes/business');
const customerRoutes = require('./routes/customer');
const addressRoutes = require('./routes/address');
const businessDetailsRoutes = require('./routes/businessDetails');
const path = require('path');

// Add middleware to parse incoming JSON and URL-encoded bodies
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors());

// Define the routes
app.use('/businesses', businessRoutes);
app.use('/customers', customerRoutes);
app.use('/addresses', addressRoutes);
app.use('/business-details', businessDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
