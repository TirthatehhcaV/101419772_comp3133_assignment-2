const jwt = require('jsonwebtoken');

// Generate JWT token
function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

// Verify JWT token
function authenticate(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createToken, authenticate };
