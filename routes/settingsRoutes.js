const express = require('express');
const settingsController = require('../controllers/settingsController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', settingsController.getSettings);
router.put('/', verifyToken, isAdmin, settingsController.updateSettings);

module.exports = router;