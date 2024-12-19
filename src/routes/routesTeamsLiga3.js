const express = require('express');
const router = express.Router();
const teamsLiga3Controller = require('../controllers/teamsLiga3Controller');

router.get('/', teamsLiga3Controller.getAllTeams);
router.get('/:teamId', teamsLiga3Controller.getTeamByTeamId);

module.exports = router;