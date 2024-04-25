const express = require('express');
const app = express();
const tokenRoute = require('./routes/token');
const authRoute = require('./routes/auth');
const businessRoutes = require('./routes/business');
const customerRoutes = require('./routes/customer');
const addressRoutes = require('./routes/address');
const businessDetailsRoutes = require('./routes/businessDetails');

// Add middleware to parse incoming JSON and URL-encoded bodies
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Define the routes
app.use('/token', tokenRoute);
app.use('/businesses', authRoute,  businessRoutes);
app.use('/customers', authRoute, customerRoutes);
app.use('/addresses', authRoute, addressRoutes);
app.use('/business-details', authRoute, businessDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
