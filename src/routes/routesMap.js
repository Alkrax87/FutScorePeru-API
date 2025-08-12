const express = require('express');
const { getMaps, getMapByCategory, changeMapElementStatus } = require('../controllers/mapController');
const router = express.Router();

router.get('/', getMaps);
router.get('/category/:category', getMapByCategory);
router.put('/category/:category/mapId/:mapId', changeMapElementStatus);

module.exports = router;