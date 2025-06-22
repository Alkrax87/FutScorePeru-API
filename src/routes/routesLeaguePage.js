const express = require('express');
const { getLeagueInformation } = require('../controllers/leaguePageController');
const router = express.Router();

router.get('/:leagueId', getLeagueInformation);

module.exports = router;