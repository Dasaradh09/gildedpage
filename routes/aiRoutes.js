const express = require('express');
const router = express.Router();
const { getAiRecommendation } = require('../controllers/aiController');

router.get('/recommend', getAiRecommendation);

module.exports = router;