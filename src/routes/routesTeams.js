const express = require("express");
const { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } = require("../controllers/teamController");
const router = express.Router();

router.get("/:category", getTeams);
router.post("/:category", createTeam);
router.get("/:category/:teamId", getTeamById);
router.put("/:category/:teamId", updateTeam);
router.delete("/:category/:teamId", deleteTeam);

module.exports = router;