const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Number of rounds for password hashing

// User registration route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
    const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully.', userId: result.insertId });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

// User authentication route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const query = 'SELECT id, password FROM Users WHERE username = ?';
      const [users] = await db.promise().query(query, [username]);
  
      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const user = users[0];
  
      // Check if the provided password matches the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      res.json({ message: 'Login successful', userId: user.id });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Failed to authenticate user.' });
    }
});

module.exports = router;