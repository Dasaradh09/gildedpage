const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAnalytics);

module.exports = router;