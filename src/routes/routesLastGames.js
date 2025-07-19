const express = require('express');
const { getLastGamesByCategory, getLastGamesByTeamId, createLastGames, updateLastGamesByTeamId, deleteLastGames } = require('../controllers/lastGamesController');
const router = express.Router();

router.get('/category/:category', getLastGamesByCategory);
router.get('/teamId/:teamId', getLastGamesByTeamId);
router.post('/', createLastGames);
router.put('/:teamId/:phase/:option', updateLastGamesByTeamId);
router.delete('/:teamId', deleteLastGames);

module.exports = router;