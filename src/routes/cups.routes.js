const express = require('express');
const { getCups, getCupByCupId, createCup, updateCup, deleteCup } = require('../controllers/cup.controller');
const router = express.Router();

router.get('', getCups);
router.get('/cupId/:cupId', getCupByCupId);
router.post('', createCup);
router.put('/:cupId', updateCup);
router.delete('/:cupId', deleteCup);

module.exports = router;