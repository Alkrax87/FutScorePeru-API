const express = require('express');
const { getTeamMatchResultsByCategory, getTeamMatchResultsByTeamId, createTeamMatchResults, updateTeamMatchResults, deleteTeamMatchResults } = require('../controllers/team-matchResults.controller');
const router = express.Router();

router.get('/category/:category', getTeamMatchResultsByCategory);
router.get('/teamId/:teamId', getTeamMatchResultsByTeamId);
router.post('/', createTeamMatchResults);
router.put('/:teamId/:phase/:index', updateTeamMatchResults);
router.delete('/:teamId', deleteTeamMatchResults);

module.exports = router;