const express = require('express');
const router = express.Router();
const resultsL3Controller = require('../controllers/resultsL3Controller');

router.get('/', resultsL3Controller.getAllResultsL3);
router.get('/:teamId', resultsL3Controller.getResultsL3ByTeamId);
router.post('/', resultsL3Controller.createResultsL3);
router.delete('/:teamId', resultsL3Controller.deleteResultsL3);

module.exports = router;