const express = require('express');
const { getDivisions, getDivisionByCategoryId, createDivision, updateDivision, deleteDivision } = require('../controllers/divisionController');
const router = express.Router();

router.get('/', getDivisions);
router.get('/:divisionId', getDivisionByCategoryId);
router.post('/', createDivision);
router.put('/:divisionId', updateDivision);
router.delete('/:divisionId', deleteDivision);

module.exports = router;