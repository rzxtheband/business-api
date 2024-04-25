const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all businesses with corresponding customers and their addresses
router.get('/', async (req, res) => {
  try {
    const [businesses] = await db.promise().query(`
      SELECT Business.business_id, Business.name, Business.description,
             Customer.customer_id, Customer.first_name, Customer.last_name,
             Customer.email, Customer.phone,
             Address.address_id, Address.street, Address.city, Address.state,
             Address.zip, Address.country
      FROM Business
      LEFT JOIN Customer ON Business.business_id = Customer.business_id
      LEFT JOIN Address ON Customer.customer_id = Address.customer_id
    `);

    // Group businesses with their customers and addresses
    const businessMap = new Map();

    businesses.forEach((row) => {
      if (!businessMap.has(row.business_id)) {
        businessMap.set(row.business_id, {
          business_id: row.business_id,
          name: row.name,
          description: row.description,
          customers: [],
        });
      }

      const business = businessMap.get(row.business_id);

      if (row.customer_id) {
        const customer = {
          customer_id: row.customer_id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          phone: row.phone,
          addresses: [],
        };

        if (row.address_id) {
          customer.addresses.push({
            address_id: row.address_id,
            street: row.street,
            city: row.city,
            state: row.state,
            zip: row.zip,
            country: row.country,
          });
        }

        business.customers.push(customer);
      }
    });

    const response = Array.from(businessMap.values());
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch business details.' });
  }
});

module.exports = router;
