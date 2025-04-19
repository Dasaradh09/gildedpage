const Book = require('../models/Book');
const User = require('../models/User');
const Order = require('../models/Order');
const Review = require('../models/Review');

const getAnalytics = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.json({
      totalBooks,
      totalUsers,
      totalOrders,
      totalReviews
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

module.exports = { getAnalytics };