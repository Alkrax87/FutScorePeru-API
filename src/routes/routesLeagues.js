const express = require('express');
const { getLeagues, getLeagueById } = require('../controllers/leagueController');
const router = express.Router();

router.get('/', getLeagues);
router.get('/:leagueId', getLeagueById);

module.exports = router;