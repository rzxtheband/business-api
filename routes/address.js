const express = require('express');
const router = express.Router();
const addressModel = require('../models/address');

// Get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await addressModel.getAllAddresses();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addresses.' });
  }
});

// Get an address by ID
router.get('/:id', async (req, res) => {
  try {
    const address = await addressModel.getAddressById(req.params.id);
    if (!address) {
      return res.status(404).json({ error: 'Address not found.' });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch address.' });
  }
});

// Create a new address
router.post('/', async (req, res) => {
  try {
    const newAddress = await addressModel.createAddress(req.body);
    res.json(newAddress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create address.' });
  }
});

// Update an address by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAddress = await addressModel.updateAddress(req.params.id, req.body);
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address.' });
  }
});

// Delete an address by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await addressModel.deleteAddress(req.params.id);
    if (result) {
      res.json({ message: 'Address deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Address not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete address.' });
  }
});

module.exports = router;
