const express = require('express');
const { getAllManagers, getManagersByCategory, createManager, updateManager, deleteManager } = require('../controllers/manager.controller');
const router = express.Router();

router.get('/', getAllManagers);
router.get('/category/:category', getManagersByCategory);
router.post('/', createManager);
router.put('/:managerId', updateManager);
router.delete('/:managerId', deleteManager);

module.exports = router;