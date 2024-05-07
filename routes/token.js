const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const app = express();
const router = express.Router();
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET; // Get the secret from environment variables
const saltRounds = 10; // Number of rounds for bcrypt password hashing

// User registration route
/**
 * @swagger
 * /token/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with a username and hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user.
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: testpassword
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       500:
 *         description: Server error.
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO Users (username, password) VALUES (?, ?)';
    const [result] = await db.promise().query(query, [username, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully.', userId: result.insertId });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

// User login and token generation
/**
 * @swagger
 * /token/login:
 *   post:
 *     summary: Login and generate a JWT token
 *     description: Logs in with a username and password, and returns a JWT token upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for login.
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: The password for login.
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: Successful login and JWT token generation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The generated JWT token.
 *       401:
 *         description: Invalid username or password.
 *       500:
 *         description: Server error.
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT id, password FROM Users WHERE username = ?';
    const [users] = await db.promise().query(query, [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create a JWT token with user ID and set an expiration time (e.g., 1 hour)
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
