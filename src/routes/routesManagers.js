const express = require('express');
const { getManagers, getManagersByCategory, getManagersByTeamId, createManager, updateManager, deleteManager } = require('../controllers/managerController');
const router = express.Router();

router.get('/', getManagers);
router.get('/category/:category', getManagersByCategory);
router.get('/teamId/:teamId', getManagersByTeamId);
router.post('/', createManager);
router.put('/:managerId', updateManager);
router.delete('/:managerId', deleteManager);

module.exports = router;