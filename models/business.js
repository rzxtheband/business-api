const db = require('./db');

// Get all businesses
async function getAllBusinesses() {
  const [rows] = await db.promise().query('SELECT * FROM Business');
  return rows;
}

// Get a business by ID
async function getBusinessById(business_id) {
  const [rows] = await db.promise().query('SELECT * FROM Business WHERE business_id = ?', [business_id]);
  return rows[0];
}

// Create a new business
async function createBusiness(business) {
  const { name, description } = business;
  const [result] = await db.promise().query(
    'INSERT INTO Business (name, description) VALUES (?, ?)',
    [name, description]
  );
  return getBusinessById(result.insertId);
}

// Update a business by ID
async function updateBusiness(business_id, business) {
  const { name, description } = business;
  await db.promise().query(
    'UPDATE Business SET name = ?, description = ? WHERE business_id = ?',
    [name, description, business_id]
  );
  return getBusinessById(business_id);
}

// Delete a business by ID
async function deleteBusiness(business_id) {
  await db.promise().query('DELETE FROM Business WHERE business_id = ?', [business_id]);
  return true;
}

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
