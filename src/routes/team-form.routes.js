const express = require('express');
const { getTeamFormsByCategory, getTeamFormByTeamId, createTeamForm, updateTeamForm, deleteTeamForm } = require('../controllers/team-form.controller');
const router = express.Router();

router.get('/category/:category', getTeamFormsByCategory);
router.get('/teamId/:teamId', getTeamFormByTeamId);
router.post('/', createTeamForm);
router.put('/:teamId/:phase/:option', updateTeamForm);
router.delete('/:teamId', deleteTeamForm);

module.exports = router;