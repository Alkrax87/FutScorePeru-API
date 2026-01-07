const express = require('express');
const { getAllTeams, getTeamsByCategory, getTeamByTeamId, createTeam, updateTeam, deleteTeam } = require('../controllers/team.controller');
const router = express.Router();

router.get('/', getAllTeams);
router.get('/category/:category', getTeamsByCategory);
router.get('/teamId/:teamId', getTeamByTeamId);
router.post('/', createTeam);
router.put('/:teamId', updateTeam);
router.delete('/:teamId', deleteTeam);

module.exports = router;