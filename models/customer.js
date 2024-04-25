const db = require('./db');

// Get all customers
async function getAllCustomers() {
  const [rows] = await db.promise().query('SELECT * FROM Customer');
  return rows;
}

// Get a customer by ID
async function getCustomerById(customer_id) {
  const [rows] = await db.promise().query('SELECT * FROM Customer WHERE customer_id = ?', [customer_id]);
  return rows[0];
}

// Create a new customer
async function createCustomer(customer) {
  const { business_id, first_name, last_name, email, phone } = customer;
  const [result] = await db.promise().query(
    'INSERT INTO Customer (business_id, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)',
    [business_id, first_name, last_name, email, phone]
  );
  return getCustomerById(result.insertId);
}

// Update a customer by ID
async function updateCustomer(customer_id, customer) {
  const { first_name, last_name, email, phone } = customer;
  await db.promise().query(
    'UPDATE Customer SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE customer_id = ?',
    [first_name, last_name, email, phone, customer_id]
  );
  return getCustomerById(customer_id);
}

// Delete a customer by ID
async function deleteCustomer(customer_id) {
  await db.promise().query('DELETE FROM Customer WHERE customer_id = ?', [customer_id]);
  return true;
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
