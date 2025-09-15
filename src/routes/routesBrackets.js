const express = require('express');
const { getFixtureBracket } = require('../controllers/bracketsController');
const router = express.Router();

router.get('/:divisionId', getFixtureBracket);

module.exports = router;