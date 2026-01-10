const express = require('express');
const { getTeamPerformancesByCategory, getTeamPerformanceByTeamId, createTeamPerformance, updateTeamPerformance, deleteTeamPerformance } = require('../controllers/team-performance.controller');
const router = express.Router();

router.get('/category/:category', getTeamPerformancesByCategory);
router.get('/teamId/:teamId', getTeamPerformanceByTeamId);
router.post('/', createTeamPerformance);
router.put('/:teamId/', updateTeamPerformance);
router.delete('/:teamId', deleteTeamPerformance);

module.exports = router;