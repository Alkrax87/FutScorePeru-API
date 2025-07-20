const express = require('express');
const { getTeams, getTeamsByCategory, getTeamById, createTeam, updateTeam, deleteTeam } = require('../controllers/teamController');
const router = express.Router();

router.get('/', getTeams);
router.get('/category/:category', getTeamsByCategory);
router.get('/teamId/:teamId', getTeamById);
router.post('/', createTeam);
router.put('/:teamId', updateTeam);
router.delete('/:teamId', deleteTeam);

module.exports = router;