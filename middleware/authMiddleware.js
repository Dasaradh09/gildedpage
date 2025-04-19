const jwt = require('jsonwebtoken');

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔐 Token:', token);
    console.log('📦 Decoded JWT:', decoded);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};