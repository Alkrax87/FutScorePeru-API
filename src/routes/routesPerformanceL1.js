const express = require('express');
const router = express.Router();
const performanceL1Controller = require('../controllers/performanceL1Controller');

router.get('/', performanceL1Controller.getAllPerformanceL1);
router.get('/:teamId', performanceL1Controller.getPerformanceL1ByTeamId);
router.post('/', performanceL1Controller.createPerformanceL1);
router.delete('/:teamId', performanceL1Controller.deletePerformanceL1);

module.exports = router;