const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare hashed password
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT Token
const generateToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { hashPassword, comparePassword, generateToken };
