const express = require('express');
const router = express.Router();
const resultsL1Controller = require('../controllers/resultsL1Controller');

router.get('/', resultsL1Controller.getAllResultsL1);
router.get('/:teamId', resultsL1Controller.getResultsL1ByTeamId);
router.post('/', resultsL1Controller.createResultsL1);
router.delete('/:teamId', resultsL1Controller.deleteResultsL1);

module.exports = router;