const db = require('./db');

// Get all addresses
async function getAllAddresses() {
  const [rows] = await db.promise().query('SELECT * FROM Address');
  return rows;
}

// Get an address by ID
async function getAddressById(address_id) {
  const [rows] = await db.promise().query('SELECT * FROM Address WHERE address_id = ?', [address_id]);
  return rows[0];
}

// Create a new address
async function createAddress(address) {
  const { customer_id, street, city, state, zip, country } = address;
  const [result] = await db.promise().query(
    'INSERT INTO Address (customer_id, street, city, state, zip, country) VALUES (?, ?, ?, ?, ?, ?)',
    [customer_id, street, city, state, zip, country]
  );
  return getAddressById(result.insertId);
}

// Update an address by ID
async function updateAddress(address_id, address) {
  const { street, city, state, zip, country } = address;
  await db.promise().query(
    'UPDATE Address SET street = ?, city = ?, state = ?, zip = ?, country = ? WHERE address_id = ?',
    [street, city, state, zip, country, address_id]
  );
  return getAddressById(address_id);
}

// Delete an address by ID
async function deleteAddress(address_id) {
  await db.promise().query('DELETE FROM Address WHERE address_id = ?', [address_id]);
  return true;
}

module.exports = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
