const express = require('express');
const { getTeamInformationByTeamId, createTeamInformation, updateTeamInformation, deleteTeamInformation } = require('../controllers/teamInformationController');
const router = express.Router();

router.get('/:teamId', getTeamInformationByTeamId);
router.post('/', createTeamInformation);
router.put('/:teamId', updateTeamInformation);
router.delete('/:teamId', deleteTeamInformation);

module.exports = router;