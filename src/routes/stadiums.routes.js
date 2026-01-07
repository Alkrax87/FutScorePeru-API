const express = require('express');
const { getAllStadiums, getStadiumByStadiumId, createStadium, updateStadium, deleteStadium} = require('../controllers/stadium.controller');
const router = express.Router();

router.get('/', getAllStadiums);
router.get('/stadiumId/:stadiumId', getStadiumByStadiumId);
router.post('/', createStadium);
router.put('/:stadiumId', updateStadium);
router.delete('/:stadiumId', deleteStadium);

module.exports = router;