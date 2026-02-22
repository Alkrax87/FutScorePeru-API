const express = require('express');
const { getTeamDetailsByCategory, getTeamDetailsByTeamId, createTeamDetails, updateTeamDetails, deleteTeamDetails } = require('../controllers/team-details.controller');
const router = express.Router();

router.get('/category/:category', getTeamDetailsByCategory);
router.get('/teamId/:teamId', getTeamDetailsByTeamId);
router.post('/', createTeamDetails);
router.put('/:teamId', updateTeamDetails);
router.delete('/:teamId', deleteTeamDetails);

module.exports = router;