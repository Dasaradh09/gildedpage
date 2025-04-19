const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const User = require('../models/User');

// @desc    Get logged-in user's profile
// @route   GET /api/users/me
// @access  Private
router.get('/me', verifyToken, async (req, res) => {
  try {
    console.log('✅ /api/users/me route accessed by user:', req.user.userId);
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('❌ Error fetching user profile:', err);
    res.status(500).json({ error: 'Server error fetching user' });
  }
});

// @desc    Update logged-in user's profile
// @route   PUT /api/users/me
// @access  Private
router.put('/me', verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name: req.body.name,
        role: req.body.role,
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error('❌ Failed to update user:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
