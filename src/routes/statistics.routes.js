const express = require('express');
const { getStatisticsByCategory } = require('../controllers/statistics.controller');
const router = express.Router();

router.get('/category/:category', getStatisticsByCategory);

module.exports = router;