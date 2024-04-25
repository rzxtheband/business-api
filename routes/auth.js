const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET; // Get the secret from environment variables

const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Store the decoded token data in `req.user`
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = jwtAuth;
