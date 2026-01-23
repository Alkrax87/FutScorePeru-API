const express = require('express');
const { getDivisions, getDivisionByCategory, createDivision, updateDivision, deleteDivision } = require('../controllers/division.controller');
const router = express.Router();

router.get('/', getDivisions);
router.get('/category/:category', getDivisionByCategory);
router.post('/', createDivision);
router.put('/:category', updateDivision);
router.delete('/:category', deleteDivision);

module.exports = router;