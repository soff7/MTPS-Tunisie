const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    keys.secretOrKey,
    { expiresIn: '15m' } // Access token valid for 15 minutes
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    keys.secretOrKey,
    { expiresIn: '7d' } // Refresh token valid for 7 days
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, keys.secretOrKey);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
