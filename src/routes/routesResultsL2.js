const express = require('express');
const router = express.Router();
const resultsL2Controller = require('../controllers/resultsL2Controller');

router.get('/', resultsL2Controller.getAllResultsL2);
router.get('/:teamId', resultsL2Controller.getResultsL2ByTeamId);
router.post('/', resultsL2Controller.createResultsL2);
router.delete('/:teamId', resultsL2Controller.deleteResultsL2);

module.exports = router;