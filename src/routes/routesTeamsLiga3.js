const express = require('express');
const router = express.Router();
const teamsLiga3Controller = require('../controllers/teamsLiga3Controller');

router.get('/', teamsLiga3Controller.getAllTeams);
router.get('/:teamId', teamsLiga3Controller.getTeamByTeamId);
router.post('/', teamsLiga3Controller.createTeam);
router.put('/:teamId', teamsLiga3Controller.updateTeam);
router.delete('/:teamId', teamsLiga3Controller.deleteTeam);

module.exports = router;