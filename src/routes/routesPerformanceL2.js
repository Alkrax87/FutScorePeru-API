const express = require('express');
const router = express.Router();
const performanceL2Controller = require('../controllers/performanceL2Controller');

router.get('/', performanceL2Controller.getAllPerformanceL2);
router.get('/:teamId', performanceL2Controller.getPerformanceL2ByTeamId);
router.post('/', performanceL2Controller.createPerformanceL2);
router.delete('/:teamId', performanceL2Controller.deletePerformanceL2);

module.exports = router;