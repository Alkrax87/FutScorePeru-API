const express = require('express');
const { getResultsByCategory, getResultsByTeamId, createResults, updateResultsByTeamId, deleteResults } = require('../controllers/resultsController');
const router = express.Router();

router.get('/category/:category', getResultsByCategory);
router.get('/teamId/:teamId', getResultsByTeamId);
router.post('/', createResults);
router.put('/:teamId/:phase/:index', updateResultsByTeamId);
router.delete('/:teamId', deleteResults);

module.exports = router;