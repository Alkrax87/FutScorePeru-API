const express = require('express');
const { getTeamsCP, getTeamCPByTeamId, createTeamCP, updateTeamCP, deleteTeamCP } = require('../controllers/team-cp.controller');
const router = express.Router();

router.get('/', getTeamsCP);
router.get('/teamId/:teamId', getTeamCPByTeamId);
router.post('/', createTeamCP);
router.put('/:teamId', updateTeamCP);
router.delete('/:teamId', deleteTeamCP);

module.exports = router;