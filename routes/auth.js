const db = require('../models/db');
const bcrypt = require('bcrypt');

const basicAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
    return res.status(401).json({ error: 'Authentication required' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  try {
    const query = 'SELECT id, password FROM Users WHERE username = ?';
    const [users] = await db.promise().query(query, [username]);

    if (users.length === 0) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.user = user; // Store the user information in the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.error('Error during Basic Auth:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = basicAuth;
