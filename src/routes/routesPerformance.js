const express = require('express');
const { getPerformanceByCategory, getPerformanceByTeamId, createPerformance, updatePerformanceByTeamId, deletePerformance } = require('../controllers/performaceController');
const router = express.Router();

router.get('/category/:category', getPerformanceByCategory);
router.get('/category/:category/teamId/:teamId', getPerformanceByTeamId);
router.post('/', createPerformance);
router.put('/:teamId/:phase', updatePerformanceByTeamId);
router.delete('/:teamId', deletePerformance);

module.exports = router;