const express = require('express');
const { getAllTeamDetails, getTeamDetailsByTeamId, createTeamDetails, updateTeamDetails, deleteTeamDetails } = require('../controllers/team-details.controller');
const router = express.Router();

router.get('/', getAllTeamDetails);
router.get('/:teamId', getTeamDetailsByTeamId);
router.post('/', createTeamDetails);
router.put('/:teamId', updateTeamDetails);
router.delete('/:teamId', deleteTeamDetails);

module.exports = router;