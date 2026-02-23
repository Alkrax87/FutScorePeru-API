const express = require('express');
const { getLeagueDetails, getLeagueDetailsByLeagueId, createLeagueDetails, updateLeagueDetails, deleteLeagueDetails } = require('../controllers/league-details.controller');
const router = express();

router.get('', getLeagueDetails);
router.get('/leagueId/:leagueId', getLeagueDetailsByLeagueId);
router.post('', createLeagueDetails);
router.put('/:leagueId', updateLeagueDetails);
router.delete('/:leagueId', deleteLeagueDetails);

module.exports = router;