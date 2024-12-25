const express = require("express");
const router = express.Router();
const teamComtroller = require("../controllers/teamsController");

router.get("/:division", teamComtroller.getAllTeams);
router.get("/:division/:teamId", teamComtroller.getTeamById);
router.post("/:division", teamComtroller.createTeam);
router.delete("/:division/:teamId", teamComtroller.deleteTeam);

module.exports = router;