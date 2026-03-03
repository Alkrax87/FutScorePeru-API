const express = require('express');
const { getTeamProfile, getLeagueProfile } = require('../controllers/page-profile.controller');
const router = express.Router();

router.get('/team/:teamId', getTeamProfile);
router.get('/league/:leagueId', getLeagueProfile);

module.exports = router;