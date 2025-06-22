const express = require('express');
const { getLeagues, getLeagueById, createLeague } = require('../controllers/leagueController');
const router = express.Router();

router.get('/', getLeagues);
router.get('/:leagueId', getLeagueById);
router.post('/', createLeague);

module.exports = router;