const express = require('express');
const router = express.Router();
const performanceL3Controller = require('../controllers/performanceL3Controller');

router.get('/', performanceL3Controller.getAllPerformanceL3);
router.get('/:teamId', performanceL3Controller.getPerformanceL3ByTeamId);
router.post('/', performanceL3Controller.createPerformanceL3);
router.delete('/:teamId', performanceL3Controller.deletePerformanceL3);

module.exports = router;