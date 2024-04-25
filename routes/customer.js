const express = require('express');
const router = express.Router();
const customerModel = require('../models/customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers.' });
  }
});

// Get a customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer.' });
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const newCustomer = await customerModel.createCustomer(req.body);
    res.json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer.' });
  }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await customerModel.updateCustomer(req.params.id, req.body);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer.' });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await customerModel.deleteCustomer(req.params.id);
    if (result) {
      res.json({ message: 'Customer deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Customer not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer.' });
  }
});

module.exports = router;
