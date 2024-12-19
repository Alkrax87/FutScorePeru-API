const express = require('express');
const router = express.Router();
const teamsL3Controller = require('../controllers/teamsL3Controller');

router.get('/', teamsL3Controller.getAllTeamsL3);
router.get('/:teamId', teamsL3Controller.getTeamL3ByTeamId);
router.post('/', teamsL3Controller.createTeamL3);
router.put('/:teamId', teamsL3Controller.updateTeamL3);
router.delete('/:teamId', teamsL3Controller.deleteTeamL3);

module.exports = router;