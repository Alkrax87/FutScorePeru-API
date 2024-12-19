const express = require('express');
const router = express.Router();
const teamsL3Controller = require('../controllers/teamsL3Controller');

router.get('/', teamsL3Controller.getAllTeams);
router.get('/:teamId', teamsL3Controller.getTeamByTeamId);
router.post('/', teamsL3Controller.createTeam);
router.put('/:teamId', teamsL3Controller.updateTeam);
router.delete('/:teamId', teamsL3Controller.deleteTeam);

module.exports = router;