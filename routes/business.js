const express = require('express');
const router = express.Router();
const businessModel = require('../models/business');

// Get all businesses
router.get('/', async (req, res) => {
  try {
    const businesses = await businessModel.getAllBusinesses();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch businesses.' });
  }
});

// Get a business by ID
router.get('/:id', async (req, res) => {
  try {
    const business = await businessModel.getBusinessById(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found.' });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch business.' });
  }
});

// Create a new business
router.post('/', async (req, res) => {
  try {
    const newBusiness = await businessModel.createBusiness(req.body);
    res.json(newBusiness);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create business.' });
  }
});

// Update a business by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBusiness = await businessModel.updateBusiness(req.params.id, req.body);
    res.json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update business.' });
  }
});

// Delete a business by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await businessModel.deleteBusiness(req.params.id);
    if (result) {
      res.json({ message: 'Business deleted successfully.'
    });
    }
 } catch (error) {
    res.status(500).json({ error: 'Failed to delete business.' });
    }
});

module.exports = router;