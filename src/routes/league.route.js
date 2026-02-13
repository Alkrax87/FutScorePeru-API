const express = require('express');
const { getLeagues, getLeagueByLeagueId, createLeague, updateLeague, deleteLeague } = require('../controllers/league.controller');
const router = express.Router();

router.get('/', getLeagues);
router.get('/leagueId/:leagueId', getLeagueByLeagueId);
router.post('/', createLeague);
router.put('/:leagueId', updateLeague);
router.delete('/:leagueId', deleteLeague);

module.exports = router;