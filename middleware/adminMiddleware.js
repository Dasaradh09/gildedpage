const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin, continue
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { isAdmin }; // Export as a named export