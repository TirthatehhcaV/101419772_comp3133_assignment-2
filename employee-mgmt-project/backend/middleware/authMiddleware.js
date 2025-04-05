const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.verifiedUser = decoded;
    } else {
      req.verifiedUser = null;
    }
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    req.verifiedUser = null;
    next();
  }
};

module.exports = authMiddleware;
