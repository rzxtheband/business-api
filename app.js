const express = require('express');
const app = express();
const signInRoutes = require('./routes/signin');
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
const customerRoutes = require('./routes/customer');
const addressRoutes = require('./routes/address');
const businessDetailsRoutes = require('./routes/businessDetails');

// Add middleware to parse incoming JSON and URL-encoded bodies
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Define the routes
app.use("/user", signInRoutes);
app.use('/auth', authRoutes);
app.use('/businesses', authRoutes, businessRoutes);
app.use('/customers', authRoutes, customerRoutes);
app.use('/addresses', authRoutes, addressRoutes);
app.use('/business-details', authRoutes, businessDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
